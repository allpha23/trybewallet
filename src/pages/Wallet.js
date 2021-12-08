import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesEdit from '../components/ExpensesEdit';

class Wallet extends React.Component {
  render() {
    const { editIsOn } = this.props;

    return (
      <div>
        <Header />
        { editIsOn ? <ExpensesEdit /> : <ExpensesForm />}
        <ExpensesTable />
      </div>);
  }
}

Wallet.propTypes = {
  editIsOn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  editIsOn: state.wallet.editIsOn,
});

export default connect(mapStateToProps)(Wallet);
