import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense, showEdit } from '../actions/index';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  convertNumber(value) {
    return Number(value).toFixed(2);
  }

  handleClickDelete({ currentTarget }) {
    const { name } = currentTarget;
    const { dispatch, wallet } = this.props;
    const { expenses } = wallet;
    const index = expenses.findIndex((element) => element.description === name);

    dispatch(index);
  }

  handleClickEdit({ currentTarget }) {
    const { name } = currentTarget;
    const { togleEdit, wallet } = this.props;
    const { expenses } = wallet;
    const index = expenses.findIndex((element) => element.description === name);
    const payload = {
      editIsOn: true,
      index,
    };

    togleEdit(payload);
  }

  renderTableItem() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return expenses.map((element) => {
      const { description, tag, method, value, exchangeRates, currency } = element;
      const { name, ask } = exchangeRates[currency];

      return (
        <tr key={ description } className="list">
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ Number(value).toFixed(2) }</td>
          <td className="td-tag">{ name.split("/", 1) }</td>
          <td>{ this.convertNumber(ask) }</td>
          <td>{ this.convertNumber(value * ask) }</td>
          <td>Real</td>
          <td className="table-button-container">
            <button
              className="table-button-edit"
              name={ description }
              type="button"
              data-testid="edit-btn"
              onClick={ this.handleClickEdit }
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="table-button-delet"
              name={ description }
              type="button"
              data-testid="delete-btn"
              onClick={ this.handleClickDelete }
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th className="th-width">Tag</th>
              <th className="th-width">Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th className="th-width">Câmbio utilizado</th>
              <th className="th-width">Valor convertido</th>
              <th className="th-width">Moeda de conversão</th>
              <th className="th-button">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableItem() }
          </tbody>
        </table>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  togleEdit: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (state) => dispatch(removeExpense(state)),
  togleEdit: (state) => dispatch(showEdit(state)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
