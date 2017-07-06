import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import firebase from 'firebase';
import {ContentSections} from './common'
import {connect} from 'react-redux';
import {initiateLogIn, userLoginRequest, userLoginFailure, userLoginSuccess} from '../actions'

class App extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBcT9q_b1hRIcoNsiWBPfa-3xxPjNBkt_0",
            authDomain: "emojinal-61d05.firebaseapp.com",
            databaseURL: "https://emojinal-61d05.firebaseio.com",
            projectId: "emojinal-61d05",
            storageBucket: "emojinal-61d05.appspot.com",
            messagingSenderId: "433898361666"
    })
    

  }
    
    renderContent() {
        switch (this.props.loggingIn) {
            case true:
                return <LoginForm onClick={this.logInRequest.bind(this)}></LoginForm>
            case null:
                return <h1>Logged In</h1>        
            default:
            return (<div>
                    <h1>Emojinal</h1>
                    <p>
                        Language moves pretty fast. <br/>If you don't stop and practice once in a while, you could miss it.
                    </p>
                    <button onClick={this.logIn.bind(this)} >Log In</button>
                </div>)
        }

    }
    
    logIn() {
        this.props.dispatch(initiateLogIn())
    }
    
    logInRequest() {
        this.props.dispatch(userLoginRequest())
    }
    
    render() {
        return (
            <div className="content-wrapper">
                <Header/>
                <ContentSections className="hero">
                    {this.renderContent()}
                </ContentSections>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        loggingIn: state.loggingIn
    }
}

export default connect(mapStateToProps)(App)
