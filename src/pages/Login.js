import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUserInformations } from '../actions/index';
import Logo from '../images/Trybe_logo.png';
import './Login.css';

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
      <div className="login">
        <div className="login-container">
          <img className="login-title" src={ Logo } alt="logo trybe" />
          {/* <h1 className="login-title">Login</h1> */}
          <form className="login-form">
            <input
              className="login-input"
              data-testid="email-input"
              placeholder="e-mail"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <span className="login-border" />
            <input
              className="login-input"
              data-testid="password-input"
              placeholder="senha"
              type="password"
              name="password"
              onChange={ this.handleChange }
            />
            <span className="login-border" />
            <Link className="login-submit-link" to="/carteira">
              <button
                className="login-submit"
                type="button"
                label="Enviar"
                disabled={ !enable }
                onClick={ this.onSubmit }
              >
                Entrar
              </button>
            </Link>
            <a className="login-reset" href="n">Esqueci a senha</a>
          </form>
        </div>
      </div>
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
