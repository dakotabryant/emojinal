import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createMockData} from '../actions';

class CardSection extends Component {
  _sendUser = () => {
    let user = {
      displayName: this.props.currentUser.displayName,
      uid: this.props.currentUser.uid,
    }
    this.props.dispatch(createMockData(user))
  }
  render() {
    const { wrongAnswers, correctAnswer, questionText } = this.props.question;
    const answers = wrongAnswers.map(answer => {
      return (
        <label htmlFor={answer}>
          <input type="radio" name={answer} />
        </label>
      );
    });
    return (
      <div>
      <form>
        <p>
          {questionText}
        </p>
        <div>
          <label htmlFor="correctAnswer">
            <input type="radio" name={correctAnswer} />
          </label>
          {answers}
        </div>
      </form>
        <button onClick={this._sendUser}>Submit Answer</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.currentQuestion,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(CardSection);
