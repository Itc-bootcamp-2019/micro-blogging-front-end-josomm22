import React from 'react';
import { setStorage, getStorage } from './Storage';
import {getTweets, sendTweet} from './api/api';
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
            idCounter: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
       await getTweets().then((value) =>{
            const tweetArray = value.data.tweets
            this.setState({messages : tweetArray});
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
        let newMessageArr = [...messages, newMessageObj]
        this.setState({ messages: newMessageArr })
        sendTweet(newMessageObj);


    }
    validateField( value) {
        let textValid = this.state.textValid;
        textValid = (value.length <= 140 ? true : false);
            
        this.setState({
            textValid: textValid,
        });
    }

    render() {
        const { messages } = this.state;
        return (
            <div className='mainWrapper'>
                <div className='messageInput'>
                    <textarea rows="6" cols="80" placeholder='What you have in mind...' value={this.state.value} onChange={this.handleChange} />
                    <button className='submitBtn' disabled={!this.state.textValid} type='submit' onClick={this.handleSubmit}> Send</button>

                </div>

                <div className='messageArea'>
                    {messages.map(obj => <Messagebubble key= {this.state.idCounter} login= {obj.userName} createdOn= {obj.date} content={obj.content} />)}
                </div>
            </div>
        )
    }
}
const Messagebubble = (props)=>{

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