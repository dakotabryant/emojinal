import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import {ContentSections} from './common'
import {connect} from 'react-redux';
import {initiateLogIn} from '../actions'

class App extends React.Component {
    renderContent() {
        if(this.props.loggingIn) {
            return <LoginForm></LoginForm>
        }
        return (<div>
                    <h1>Emojinal</h1>
                    <p>
                        Language moves pretty fast. <br/>If you don't stop and practice once in a while, you could miss it.
                    </p>
                    <button onClick={this.logIn.bind(this)} >Log In</button>
                </div>)
    }
    logIn() {
        this.props.dispatch(initiateLogIn())
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
