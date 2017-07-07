import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logOut, showLoginForm } from '../actions';
import LoginForm from './LoginForm';

class Header extends Component {
  _toggleLoginForm = () => {
    this.props.dispatch(showLoginForm());
  };
  _logOut = () => {
    firebase.auth().signOut();
    this.props.dispatch(logOut())
  };

  modalRender() {
    let logInButtonText;
    this.props.loginForm
      ? (logInButtonText = 'Cancel')
      : (logInButtonText = 'Log in');

    if (this.props.loggedIn) {
      return (
        <div>
          <button className="logOut" onClick={this._logOut}>
            Log Out
          </button>
          <h3>
            {this.props.name}
          </h3>
          <img className="userPhoto" src={this.props.photo} alt="" />
        </div>
      );
    }
    return (
      <button onClick={this._toggleLoginForm}>
        {logInButtonText}
      </button>
    );
  }

  render() {
    return (
      <div className="header">
        {this.modalRender()}
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.currentUser.isLogged,
    photo: state.currentUser.photo,
    name: state.currentUser.displayName,
    loginForm: state.showLoginForm
  };
};

export default connect(mapStateToProps)(Header);
