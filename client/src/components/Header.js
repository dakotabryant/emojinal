import React, { Component } from 'react';
import {connect} from 'react-redux';
import {initiateLogIn, cancelLogIn} from '../actions'
import LoginForm from './LoginForm';

class Header extends Component {
    logIn() {
        this.props.dispatch(initiateLogIn())
    }
    cancelLogIn() {
        this.props.dispatch(cancelLogIn())
    }
    modalRender() {
        if(this.props.loggingIn) {
            return <button onClick={this.cancelLogIn.bind(this)}>Cancel Log In</button>
        }
        return <button onClick={this.logIn.bind(this)}>{`Are you logged in? ${this.props.loggedIn}`}</button>
    }

    render() {
        return (
            <div className="header" >
                {this.modalRender()}
            </div>
        );
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(Header)