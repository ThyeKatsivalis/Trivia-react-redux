import React from 'react';
import PropTypes from 'prop-types';
import RankingComp from '../components/RankingComp';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <RankingComp
        history={ history }
      />
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
