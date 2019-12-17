import React from 'react';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value :''
        }
    }
render(){
    return(
        <div>
            <h1>Profile</h1>
            <h5>User Name</h5>
            <input type = 'text'/>
            <button>Save</button>
        </div>
    )
}

}
export default Profile;
