import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFirst,
  createMockData,
  correctAnswer,
  incorrectAnswer
} from '../actions';

class CardSection extends Component {
  state = {
    inputValue: ''
  };
  _getQuestions = () => {
    let user = {
      displayName: this.props.currentUser.displayName,
      uid: this.props.currentUser.uid
    };
    this.props.dispatch(createMockData(user));
  };
  handleOptionChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  _handleAnswerSubmit = () => {
    let user = {
      displayName: this.props.currentUser.displayName,
      uid: this.props.currentUser.uid
    };
    if (this.state.inputValue === this.props.question.correctAnswer) {
      return this.props.dispatch(correctAnswer(user));
    } else {
      return this.props.dispatch(incorrectAnswer(user));
    }
  }
  render() {
    const { wrongAnswers, correctAnswer, questionText } = this.props.question;
    const answers = wrongAnswers.map((answer) => {
      return (
        <label key={answer} htmlFor={answer}>
          {answer}
          <input
            type="radio"
            name="questions"
            value={answer}
            checked={this.state.inputValue === { answer }}
            onChange={event => this.handleOptionChange(event)}
          />
        </label>
      );
    });
    let cardSectionContent = (
      <button onClick={this._getQuestions}>Start Game</button>
    );
    if (this.props.question.correctAnswer != null) {
      cardSectionContent = (
        <div className="form-section">
          <form>
            <p>
              {questionText}
            </p>
            <div>
              <label htmlFor="correctAnswer">
                {correctAnswer}
                <input
                  type="radio"
                  name="questions"
                  value={correctAnswer}
                  checked={this.state.inputValue === { correctAnswer }}
                  onChange={event => this.handleOptionChange(event)}
                />
              </label>
              {answers}
            </div>
          </form>
          <button onClick={this._handleAnswerSubmit}>Submit Answer</button>
        </div>
      );
    }
    return (
      <div>
        {cardSectionContent}
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
