import React from 'react';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navBar'>
            <div className='centerNav'>
                <div className='button'>
                    <Link to="/"> Home </Link>
                </div>
                <div className='button'>
                    <Link to="/profile">
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;