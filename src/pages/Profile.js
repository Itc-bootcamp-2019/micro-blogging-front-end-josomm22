import React from 'react';
import { setUserName, getUserName } from '../lib/Storage';
import firebase from 'firebase/app';


import '../css/profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            imageURL: '',
            imageFile: null
        }
        this.user = firebase.auth().currentUser;
        
        this.handleImage = this.handleImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertToUrl = this.convertToUrl.bind(this);
    };
    componentDidMount() {
        this.setState({ value: this.user.displayName, imageURL: this.user.photoURL });
        console.log(this.user)


    }
    handleChange(event) {
        let value = event.target.value
        this.setState({ value: value },

        );

    };
    handleSubmit() {
        const userName = this.state.value;
        this.user.updateProfile({
            displayName: userName,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
        // setUserName(userName);

    };
    handleImage(event) {
        // Create a root reference
        // var storageRef = firebase.storage().ref();

        // // Create a reference to 'mountains.jpg'
        // var mountainsRef = storageRef.child('mountains.jpg');

        // // Create a reference to 'images/mountains.jpg'
        // var mountainImagesRef = storageRef.child('images/mountains.jpg');

        // // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name            // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath    // false
        const selectedFile = event.target.files[0];
        this.setState({imageFile : selectedFile});
        var reader = new fileReader();
        let url = reader.readAsDataURL(this.state.imageFile)
        console.log(url)
        this.setState({imageURL: url });
        // console.log(selectedFile)
    }
    convertToUrl(){
        


    }

    render() {
        const { value, imageURL } = this.state;
        return (
            <div className='profile'>
                <h1>Profile</h1>
                <div className='inputContainer'>
                    <h5>User Name</h5>
                    <div className='profileInput inputBox'>
                        <input type='text' value={value} onChange={this.handleChange} />
                    </div>
                    <div className='flexRight'>
                        <button className='btn saveProfile' onClick={this.handleSubmit}>Save</button>
                    </div>
                    <img className='avatar' src={imageURL} />
                    <input type="file" accept="image/*,.pdf" onChange={this.handleImage} />


                </div>
            </div>
        )
    }

}
export default Profile;
