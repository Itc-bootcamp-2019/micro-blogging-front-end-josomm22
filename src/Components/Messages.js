import React from 'react';
import { setStorage, getStorage } from './Storage';
import { getTweets, sendTweet, sortDescending } from './api/api';
import '../css/messages.css';

let userName = 'Johny';
class messageObj {
    constructor(userName, date, content) {
        this.userName = userName;
        this.date = date;
        this.content = content;
    }
}
class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messages: [],
            textValid: true,
            idCounter: 0,
            isLoading: true,
            isSending: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     componentDidMount() {
         getTweets().then((value) => {
            const tweetArray = sortDescending(value.data.tweets);
            this.setState({ messages: tweetArray, isLoading: false });
        },
        )

    }
    handleChange(event) {
        let value = event.target.value
        this.setState({ value: value },
            () => { this.validateField(value) }
        );

    }
    handleSubmit() {
        const { messages,isSending } = this.state;
        let date = (new Date()).toISOString();
        let newMessageObj = new messageObj(userName, date, this.state.value)
        let newMessageArr = [...messages, newMessageObj]
        this.setState({ messages: newMessageArr, isSending:true })
        sendTweet(newMessageObj).then(error => {
            this.setState({isSending:false});

        });


    }
    validateField(value) {
        let textValid = this.state.textValid;
        textValid = (value.length <= 140 ? true : false);

        this.setState({
            textValid: textValid,
        });
    }

    render() {
        const { messages, isLoading, textValid, isSending } = this.state;
        return (
            <div className='mainWrapper'>
                <div className='messageInput'>
                    <textarea rows="6" cols="80" placeholder='What you have in mind...' value={this.state.value} onChange={this.handleChange} />
                    <button className='submitBtn' disabled={!textValid ||isSending } type='submit' onClick={this.handleSubmit}> Send</button>

                </div>

                <div className='messageArea'>
                    {isLoading && <h5>Loading...</h5>}
                    {!isLoading
                        &&
                        messages.map(obj => <Messagebubble key={this.state.idCounter} login={obj.userName} createdOn={obj.date} content={obj.content} />)}
                </div>
            </div>
        )
    }
}
const Messagebubble = (props) => {

    return (
        <div className='bubble'>
            <p>{props.content}</p>
            <p>
                <span>
                    User: {props.login}
                </span>
                <span>
                    Created on: {props.createdOn}
                </span>
            </p>
        </div>

    )

}

export default Messages;