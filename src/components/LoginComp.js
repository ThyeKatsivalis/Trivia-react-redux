import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail, saveName, fetchToken } from '../redux/actions';

class LoginComp extends React.Component {
  state = {
    name: '',
    email: '',
    validation: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.handlValidationBtn);
  };

  handlValidationBtn = () => {
    const { name, email } = this.state;
    const minName = 2;
    if (email.includes('@')
    && email.includes('.com')
    && name.length > minName) {
      this.setState({
        validation: false,
      });
    } else {
      this.setState({
        validation: true,
      });
    }
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    await dispatch(fetchToken());
    dispatch(saveName(name));
    dispatch(saveEmail(email));
    history.push('/game');
  };

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { name, email, validation } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              name="name"
              id="name-input"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              name="email"
              id="email-input"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ validation }
            onClick={ this.handleClick }
          >
            Play

          </button>
          <button
            type="button"
            data-testid="btn-settings"
            disabled={ false }
            onClick={ this.handleClickConfig }
          >
            Configurações

          </button>
        </form>
      </div>
    );
  }
}

LoginComp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

/* const mapStateToProps = (state) => ({
  token: state.api.token,
}); */

export default connect()(LoginComp);
