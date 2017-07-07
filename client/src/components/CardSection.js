import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFirst, createMockData } from '../actions';

class CardSection extends Component {
  state = {
    selectedOption: 'option1'
  }
  _getQuestions = () => {
    let user = {
      displayName: this.props.currentUser.displayName,
      uid: this.props.currentUser.uid
    };
    this.props.dispatch(getFirst(user));
  };
  _submitAnswer = () => {
    
  }
  render() {
    const { wrongAnswers, correctAnswer, questionText } = this.props.question;
    console.log(wrongAnswers);
    const answers = wrongAnswers.map(answer => {
      return (
        <label htmlFor={answer}>
          {answer}
          <input type="radio" name="questions" />
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
                <input id="correctAnswer" type="radio" name="questions" />
              </label>
              {answers}
            </div>
          </form>
          <button onClick={this._submitAnswer}>Submit Answer</button>
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
