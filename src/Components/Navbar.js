import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useRouteMatch,
    useParams
} from "react-router-dom";

const Navbar = () => {
    return (
        <Router>
            <div className='navBar'>
                <div className='centerNav'>
                    <div className='button'>
                        <Link> Home </Link>
                    </div>
                    <div className='button'>
                        <Link>
                            Profile
                </Link>
                    </div>
                </div>
            </div>
                </Router>
            )
}
export default Navbar;