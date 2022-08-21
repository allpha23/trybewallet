import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';
import Logo from '../images/Trybe_logo.png';

class Header extends React.Component {
  totalExpenses() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    if (expenses.length === 0) return 0;
    const total = expenses.reduce((previous, current) => {
      const { currency } = current;
      const exchange = current.value * current.exchangeRates[currency].ask;
      return (Number(previous) + Number(exchange));
    }, 0);

    return total.toFixed(2);
  }

  render() {
    const { user } = this.props;
    const { email } = user;

    return (
      <div className="header-container">
        <div className="header-logo-container">
          <img className="header-logo" src={ Logo } alt="logo trybe" />
        </div>
        <div className="header">
          <div className="header-email" data-testid="email-field">
            Email:
            {' '}
            { email }
          </div>
          <div className="header-despesa" data-testid="total-field">
            Despesa Total:
            {' '}
            {this.totalExpenses()}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
