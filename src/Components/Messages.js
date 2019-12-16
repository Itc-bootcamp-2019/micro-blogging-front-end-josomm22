import React from 'react';
import { setStorage, getStorage} from './Storage'

class messageObj{
    constructor(id, login, createdOn, content){
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
            value: ''
            
        }
        this.messages = []
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.messages = getStorage()
        console.log(this.messages);
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        this.setState({ value: event.target.value })
        this.messages.push(new messageObj('1','majo','1111',this.state.value))
        setStorage(this.messages);


    }
    Messagebubble(props){
        return(
            <p>{props.content}</p>

        )
    }

    render() {
        return (
            <div className = 'mainWrapper'>
                <div className= 'messageInput'>
                <textarea rows="4" cols="50" type='text' value={this.state.value} onChange={this.handleChange} />
                <button type='submit' onClick={this.handleSubmit}> Send</button>

                </div>
               
            <div>
                {this.messages.map(obj=> <this.Messagebubble content = {obj.content}/>)}
            </div>
            </div>
        )
    }
}

export default Messages;