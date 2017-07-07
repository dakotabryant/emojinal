import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFirst, createMockData } from '../actions';

class CardSection extends Component {
  componentDidMount() {
    let user = {
      displayName: this.props.currentUser.displayName,
      uid: this.props.currentUser.uid
    };
    this.props.dispatch(getFirst(user))
  }
  showContent() {
    const { wrongAnswers, correctAnswer, questionText } = this.props.question;
    
    if (this.props.question.correctAnswer != null) {
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
          <button onClick={console.log('clicked')}>Submit Answer</button>
        </div>
      );
    }
    return <h3>Loading</h3>;
  }
  render() {
    return (
      <div>
        {this.showContent()}
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
