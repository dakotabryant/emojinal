import React, {Component} from 'react';
import {connect} from 'react-redux';

class CardSection extends Component {
  render() {
    return (
      <div>hey</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

export default connect(mapStateToProps)(CardSection)