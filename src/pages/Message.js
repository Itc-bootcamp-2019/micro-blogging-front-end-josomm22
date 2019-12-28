import React from 'react';
import { sortDescending, sendTweetToDB, listenToTweetsChange, getUserNameFromUID } from '../api/api';
import { Messagebubble } from '../Components/MessageBubble';
import firebase from 'firebase/app';

import '../css/messages.css';

class messageObj {
    constructor(userName, date, content) {
        this.userName = userName;
        this.date = date;
        this.content = content;
    }
};
class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messageQuantity: 10,
            messages: [],
            textValid: true,
            idCounter: 0,
            isLoading: true,
            isSending: false,
            hasError: false,
            errorMessage: 'bababa',
            currentUserID: ''
        };
        this.user = firebase.auth().currentUser;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({ currentUserID: this.user.uid });
        this.loadTweets();

    };
    loadTweets() {
        return listenToTweetsChange(this.state.messageQuantity, (tweets) => {
            tweets = sortDescending(tweets);
            tweets.forEach(obj => {
                getUserNameFromUID(obj.uid).then((userData) => {
                    obj.userName = userData.userName;
                    obj.imageURL = userData.photoURL;
                    // console.log(obj.userName);
                    this.setState({ messages: tweets, isLoading: false })

                });
            });
            // console.log(Object.keys(tweets[0]))
            // console.log(Object.keys(this.state.messages[0]))

        });
    };
    handleChange(event) {
        let value = event.target.value
        this.setState({ value: value },
            () => { this.validateField(value) }  //remove this callback
        );

    };
    handleSubmit() {
        const { currentUserID } = this.state;
        let date = (new Date()).toISOString();
        let newMessageObj = new messageObj(currentUserID, date, this.state.value)
        this.setState({ isSending: true })
        sendTweetToDB(newMessageObj).then(() => {
            this.setState({ isSending: false, value: '' });
            console.log(this.state.messageQuantity);
            this.loadTweets();

        })
            .catch(error => {
                console.log(error);
                this.setState({ isSending: false });

            }

            );


    };

    //try to get rid of validatefield and set in render
    validateField(value) {
        const { hasError } = this.state;
        let textValid = this.state.textValid;
        textValid = (value.length <= 140 ? true : false);
        if (hasError) {
            this.setState({ errorMessage: "The tweet can't contain more than 140 chars" })
        }
        this.setState({
            textValid: textValid, hasError: !textValid
        });
    }

    render() {
        const { messages, isLoading, textValid, isSending, errorMessage, hasError, value } = this.state;
        // const { isValid, hasError } = this.validateField(value)
        return (
            <div className='mainWrapper' >
                <div className='messageInput inputBox'>
                    <textarea rows="6" cols="80" placeholder='What you have in mind...' value={value} onChange={this.handleChange} />
                    {hasError && <div className='errorMessage'><h3>{errorMessage}</h3> </div>}
                    <button className='btn submitTweet' disabled={!textValid || isSending} type='submit' onClick={this.handleSubmit}>
                        {isSending && 'sending'}
                        {!isSending && 'tweet'}
                    </button>

                </div>

                <div className='messageArea'>
                    {isLoading && <h5>Loading...</h5>}
                    {!isLoading
                        &&
                        messages.map((obj, index) => <Messagebubble key={index} imageURL={obj.imageURL} login={obj.userName} createdOn={obj.date} content={obj.content} />)}
                </div>
            </div>
        )
    }
}

export default Messages;