import React from 'react';
import { setUserName } from '../lib/Storage';

import '../css/profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(event) {
        let value = event.target.value
        this.setState({ value: value },
            console.log(value)

        );

    };
    handleSubmit(){
        const userName = this.state.value;
        setUserName(userName);

    };

    render() {
        const {value} = this.state;
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
                </div>
            </div>
        )
    }

}
export default Profile;
