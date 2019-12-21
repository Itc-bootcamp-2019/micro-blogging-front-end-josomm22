import React from 'react';
import '../css/login.css'

const Login = () => {
    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h3>Login</h3>
                <h3>This is where you login</h3>
                <div className='login-input'>

                <label for='login'>login</label>
                <input type='text' id='login' />
                <br />
                <label for='password'>password</label>
                <input type='password' id='password' />
                </div>
                <div>
                    <button className='btn'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;