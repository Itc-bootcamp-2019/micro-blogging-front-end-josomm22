import React from 'react';
import { setUserName, getUserName } from '../lib/Storage';
import firebase from 'firebase/app';


import '../css/profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            imageURL:''
        }
        this.user = firebase.auth().currentUser;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount(){
        this.setState({value : this.user.displayName, imageURL: this.user.photoURL});
        console.log(this.user)


    }
    handleChange(event) {
        let value = event.target.value
        this.setState({ value: value },
            console.log(value)

        );

    };
    handleSubmit(){
        const userName = this.state.value;
        this.user.updateProfile({
            displayName: userName,
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });
        // setUserName(userName);

    };

    render() {
        const {value,imageURL} = this.state;
        return (
            <div className='profile'>
                <h1>Profile</h1>
                <div className='inputContainer'>
                    <h5>User Name</h5>
                    <div className='profileInput inputBox'>
                        <input type='text' value={value} onChange={this.handleChange}/>
                    </div>
                    <div className='flexRight'>
                        <button className='btn saveProfile'onClick={this.handleSubmit}>Save</button>
                    </div>
                    <img className='avatar' src={imageURL}/>

                </div>
            </div>
        )
    }

}
export default Profile;
