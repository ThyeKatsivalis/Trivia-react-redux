import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackComp extends React.Component {
  mensageUser = (player) => {
    const magicNumber = 3;
    let MSG = '';
    if (player < magicNumber) {
      MSG = 'Could be better...';
    } else {
      MSG = 'Well Done!';
    }
    return MSG;
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player: { assertions, score } } = this.props;
    return (
      <div>
        <span data-testid="feedback-text">
          { this.mensageUser(assertions) }
        </span>
        <span>
          Assertions:
        </span>
        <span data-testid="feedback-total-question">
          { assertions }
        </span>
        <span>
          Score:
        </span>
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <button
          data-testid="btn-play-again"
          onClick={ () => this.handleClick() }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          onClick={ () => this.handleClickRanking() }
        >
          Ranking
        </button>
      </div>
    );
  }
}

FeedbackComp.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(FeedbackComp);
