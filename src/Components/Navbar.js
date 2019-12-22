import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    NavLink,
} from "react-router-dom";
import "firebase/auth";
import * as firebase from 'firebase/app';


const Navbar = () => {
    return (
        <nav className='navBar'>
            <div className='centerNav'>
                <div className='button'>
                    <NavLink exact={true} activeClassName="is-Active" to="/"> Home </NavLink>
                </div>
                <div className='button'>
                    <NavLink activeClassName="is-Active" to="/profile">
                        Profile
                    </NavLink>
                </div>
                  <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
            </div>
        </nav>
    )
}
export default Navbar;