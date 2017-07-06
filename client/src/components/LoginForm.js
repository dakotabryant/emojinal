import React from 'react';

const LoginForm = () => {
    return (
        <div className="inputWrapper">
            <div className="inputContainer">
                <label htmlFor="email">Email</label>
                <input type="text" name="email"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="Password">Password</label>
                <input type="text" name="Password"/>
            </div>
        </div>
    );
}

export default LoginForm;