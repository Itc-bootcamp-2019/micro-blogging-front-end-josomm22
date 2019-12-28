import React from 'react';
import { sortDescending, listenToTweetsChange, getUserNameFromUID } from '../api/api';
import {Messagebubble} from './MessageBubble'

import '../css/messages.css';

class Messagesdisplay extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            messageQuantity: 10,
            messages: [],
            idCounter: 0,
            isLoading: true,
            hasError: false,
        };
    }
    componentDidMount() {
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

    render() {
        const { messages, isLoading} = this.state;
        // const { isValid, hasError } = this.validateField(value)
        return (

                <div className='messageArea'>
                    {isLoading && <h5>Loading...</h5>}
                    {!isLoading
                        &&
                        messages.map((obj, index) => <Messagebubble key={index} imageURL={obj.imageURL} login={obj.userName} createdOn={obj.date} content={obj.content} />)}
                </div>
        )
    }
}

export default Messagesdisplay;
