import React from 'react';
import PropTypes from 'prop-types';

class RankingComp extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => this.handleClick() }
        >
          Go home
        </button>
      </>
    );
  }
}

RankingComp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RankingComp;
