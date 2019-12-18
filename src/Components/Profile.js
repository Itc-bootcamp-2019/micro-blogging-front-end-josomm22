import React from 'react';

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
                    <div className='profileInput'>
                        <input type='text' />
                    </div>
                    <button className='btn saveProfile'>Save</button>
                </div>
            </div>
        )
    }

}
export default Profile;
