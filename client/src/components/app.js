import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import CardSection from './CardSection';
import firebase from 'firebase';
import { ContentSections } from './common';
import { connect } from 'react-redux';
import {
  userLoginRequest,
  userLoginFailure,
  userLoginSuccess,
  showLoginForm,
  createMockData
} from '../actions';

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcT9q_b1hRIcoNsiWBPfa-3xxPjNBkt_0',
      authDomain: 'emojinal-61d05.firebaseapp.com',
      databaseURL: 'https://emojinal-61d05.firebaseio.com',
      projectId: 'emojinal-61d05',
      storageBucket: 'emojinal-61d05.appspot.com',
      messagingSenderId: '433898361666'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.props.dispatch(userLoginSuccess(user));
      } else {
        return this.props.dispatch(userLoginFailure());
      }
    });
  }
  _showLoginForm = () => {
    this.props.dispatch(showLoginForm());
  };

  logInRequest() {
    this.props.dispatch(userLoginRequest());
  }

  renderContent() {
    if (this.props.loading) {
      return <h1>Loading</h1>;
    } else if (this.props.showLoginForm) {
      return <LoginForm onClick={this.logInRequest.bind(this)} />;
    } else if (this.props.loggedIn) {
      return <CardSection />;
    } else if (!this.props.loggedIn && !this.props.showLoginForm) {
      return (
        <div>
          <h1>Emojinal</h1>
          <p>
            Language moves pretty fast.
            <br />If you don't stop and practice once in a while, you could miss
            it.
          </p>
          <button onClick={this._showLoginForm}>Log In</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <Header />
        <ContentSections className="hero">
          {this.renderContent()}
        </ContentSections>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    loggedIn: state.currentUser.isLogged,
    showLoginForm: state.showLoginForm
  };
};

export default connect(mapStateToProps)(App);
