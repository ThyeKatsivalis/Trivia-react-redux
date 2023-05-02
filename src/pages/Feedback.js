import React from 'react';
import PropTypes from 'prop-types';
import FeedbackComp from '../components/FeedbackComp';
import HeaderComp from '../components/HeaderComp';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <HeaderComp />
        <FeedbackComp
          history={ history }
        />
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
