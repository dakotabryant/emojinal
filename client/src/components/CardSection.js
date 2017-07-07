import React, { Component } from 'react';
import { connect } from 'react-redux';

class CardSection extends Component {
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
        <button type='submit'>Submit Answer</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.currentQuestion
  };
};

export default connect(mapStateToProps)(CardSection);
