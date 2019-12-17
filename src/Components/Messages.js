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
            isSending: false,
            hasError: false,
            errorMessage: 'bababa'
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
        const { messages } = this.state;
        let date = (new Date()).toISOString();
        let newMessageObj = new messageObj(userName, date, this.state.value)
        this.setState({ isSending: true })
        sendTweet(newMessageObj).then(() => {
            let newMessageArr = [...messages, newMessageObj]
            this.setState({ messages: newMessageArr, isSending: false, value: '' });

        })
            .catch(error => {
                console.log(error);
                this.setState({ isSending: false });

            }

            );


    }
    validateField(value) {
        const { hasError } = this.state;
        let textValid = this.state.textValid;
        textValid = (value.length <= 140 ? true : false);
        if (hasError) {
            this.setState({ errorMessage: "The tweet can\'t contain more than 140 chars" })
        }

        this.setState({
            textValid: textValid, hasError: !textValid
        });
    }

    render() {
        const { messages, isLoading, textValid, isSending, errorMessage, hasError, idCounter } = this.state;
        return (
            <div className='mainWrapper'>
                <div className='messageInput'>
                    <textarea rows="6" cols="80" placeholder='What you have in mind...' value={this.state.value} onChange={this.handleChange} />
                    {hasError && <h3>{errorMessage}</h3>}
                    <button className='submitBtn' disabled={!textValid || isSending} type='submit' onClick={this.handleSubmit}> Send</button>

                </div>

                <div className='messageArea'>
                    {isLoading && <h5>Loading...</h5>}
                    {!isLoading
                        &&
                        messages.map((obj, index) => <Messagebubble key={index} login={obj.userName} createdOn={obj.date} content={obj.content} />)}
                </div>
            </div>
        )
    }
}
const Messagebubble = (props) => {

    return (
        <div id={props.key} className='bubble'>
            <div className='bubbleSection'>
                <p>{props.content}</p>
            </div>
            <div className='bubbleSection'>
                <div id='login' className='bubbleDetails'>
                    <span>
                        User: {props.login}
                    </span>
                </div>
                <div id='date' className='bubbleDetails'>
                    <span>
                        Created on: {props.createdOn}
                    </span>
                </div>
            </div>
        </div>

    )

}

export default Messages;