import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';


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
        this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
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
    handleUserNameSubmit() {
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
        const selectedFile = event.target.files[0];
        this.setState({ imageFile: selectedFile });
        this.setState({ imageURL: URL.createObjectURL(selectedFile) });
    }
    handleImageSubmit() {
        const file = this.state.imageFile;
        const storageRef = firebase.storage().ref();
        const mainImage = storageRef.child(`images/${file.name}`)
        mainImage.put(file)
        .then(
            mainImage.getDownloadURL().then((url) => {
                console.log(url);
            })
        )
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
                        <button className='btn saveProfile' onClick={this.handleUserNameSubmit}>Save</button>
                    </div>
                    <img className='avatar' src={imageURL} />
                    <input type="file" accept="image/*,.pdf" onChange={this.handleImage} />
                    <button className='btn saveProfile' onClick={this.handleImageSubmit}>Upload image</button>


                </div>
            </div>
        )
    }

}
export default Profile;
