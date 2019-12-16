import React from 'react';
import { setStorage, getStorage } from './Storage'
import '../css/messages.css'

class messageObj {
    constructor(id, login, createdOn, content) {
        this.id = id;
        this.login = login;
        this.createdOn = createdOn;
        this.content = content;
    }
}
class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            messages: [],
            idCounter: 0
        }
        // this.messages = []
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const storage = getStorage()
        console.log(storage);
        this.setState({ messages: storage })

    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit() {
        const { messages } = this.state;
        let newMessageArr = [...messages, new messageObj('1', 'majo', '1111', this.state.value)]
        this.setState({ messages: newMessageArr })
        setStorage(newMessageArr);


    }
    Messagebubble(props) {

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

    render() {
        const { messages } = this.state;
        return (
            <div className='mainWrapper'>
                <div className='messageInput'>
                    <textarea rows="4" cols="50" type='text' value={this.state.value} onChange={this.handleChange} />
                    <button type='submit' onClick={this.handleSubmit}> Send</button>

                </div>

                <div className='messageArea'>
                    {messages.map(obj => <this.Messagebubble key= {this.state.idCounter} login= {obj.login} createdOn= {obj.createdOn} content={obj.content} />)}
                </div>
            </div>
        )
    }
}

export default Messages;