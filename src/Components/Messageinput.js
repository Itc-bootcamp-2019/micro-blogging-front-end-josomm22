import React from 'react';
import { sendTweetToDB} from '../api/api';
import firebase from 'firebase/app';
import '../css/messages.css';

class messageObj {
    constructor(userName, date, content) {
        this.userName = userName;
        this.date = date;
        this.content = content;
    }
};

class Messageinput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            textValid: true,
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
        const { textValid, isSending, errorMessage, hasError, value } = this.state;

        return (
            <div className='messageInput inputBox'>
                <textarea rows="6" cols="80" placeholder='What you have in mind...' value={value} onChange={this.handleChange} />
                {hasError && <div className='errorMessage'><h3>{errorMessage}</h3> </div>}
                <button className='btn submitTweet' disabled={!textValid || isSending} type='submit' onClick={this.handleSubmit}>
                    {isSending && 'sending'}
                    {!isSending && 'tweet'}
                </button>

            </div>
        )
    }

};
export default Messageinput;