import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUserInformations } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      enable: false,
      email: '',
      password: '',

    };

    this.handleChange = this.handleChange.bind(this);
    this.isEnable = this.isEnable.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { dispatchUserInformations } = this.props;
    dispatchUserInformations(this.state);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.isEnable());
  }

  isEnable() {
    const { password, email } = this.state;
    const min = 6;

    if ((password.length >= min)
    && (email.includes('@'))
    && (email.includes('.com'))) this.setState({ enable: true });
    else this.setState({ enable: false });
  }

  render() {
    const { enable, email } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          label="email: "
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          label="senha: "
          type="password"
          name="password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            label="Enviar"
            disabled={ !enable }
            onClick={ this.onSubmit }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInformations: (state) => dispatch(setUserInformations(state)),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

Login.propTypes = {
  dispatchUserInformations: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
