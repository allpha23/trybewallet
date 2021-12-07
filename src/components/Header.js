import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">
          Despesa Total:
          { this.totalExpenses() }
        </div>
        <div data-testid="header-currency-field">Cambio: BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  wallet: PropTypes.objectOf(PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
