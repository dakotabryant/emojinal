import React from 'react';
import AuthIcons from './AuthIcons';

class LoginForm extends React.Component {
    render() {
    return (
        <div className="inputWrapper">
            <div className="inputContainer">
                <label htmlFor="email">Email</label>
                <input type="text" name="email"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="Password">Password</label>
                <input type="password" name="Password"/>
            </div>
            <button onClick={this.props.onClick}>Log In</button>
            <div className="auth-container">
                <AuthIcons image={require("../assets/images/google_logo1600.png")} className={"google"}></AuthIcons>
                
            </div>
        </div>
    );
    }
}

export default LoginForm;

// <img src={require("../assets/images/google_logo1600.png")} alt=""/>
//                 <img src={require("../assets/images/github-512.png")} alt=""/>