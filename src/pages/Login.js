import React from 'react';
import PropTypes from 'prop-types';
import LoginComp from '../components/LoginComp';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <LoginComp
        history={ history }
      />
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
