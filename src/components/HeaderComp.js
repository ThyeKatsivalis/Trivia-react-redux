import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { MD5 } = require('crypto-js');

class HeaderComp extends React.Component {
  state = {
    gravatarUrl: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${MD5(email)}`;
    this.setState({
      gravatarUrl,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarUrl } = this.state;
    return (
      <div>
        <img src={ gravatarUrl } alt="gravatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.player.score,
});

HeaderComp.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
};

HeaderComp.defaultProps = {
  name: '',
  score: 0,
  email: '',
};

export default connect(mapStateToProps)(HeaderComp);
