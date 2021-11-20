import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <div data-testid="total-field">Despesa Total: 0</div>
        <div data-testid="header-currency-field">Cambio: BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
