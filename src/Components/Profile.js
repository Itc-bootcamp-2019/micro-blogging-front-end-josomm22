import React from 'react';
import '../css/profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <div className='profile'>
                <h1>Profile</h1>
                <div className='inputContainer'>
                    <h5>User Name</h5>
                    <div className='profileInput inputBox'>
                        <input type='text' />
                    </div>
                    <div className='flexRight'>
                        <button className='btn saveProfile'>Save</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile;
