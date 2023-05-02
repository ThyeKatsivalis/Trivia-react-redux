import React from 'react';
import PropTypes from 'prop-types';
import GameComp from '../components/GameComp';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <GameComp
          history={ history }
        />
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
