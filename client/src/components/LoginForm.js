import React from 'react';
import AuthIcons from './AuthIcons';
import {connect} from 'react-redux';
import {googleLoginRequest} from '../actions'

class LoginForm extends React.Component {
    logInToGoogle() {
        return this.props.dispatch(googleLoginRequest())
    }
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
                <AuthIcons onClick={this.logInToGoogle.bind(this)} image={require("../assets/images/google_logo1600.png")} className={"google"}></AuthIcons>
                
            </div>
        </div>
    );
    }
}



export default connect()(LoginForm)