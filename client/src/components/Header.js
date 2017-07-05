import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {
    modalRender() {
        if(this.props.loggingIn) {
            return 
        }
        return <button>Log In</button>
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
        loggingIn: state.loggingIn
    }
}

export default connect(mapStateToProps)(Header)