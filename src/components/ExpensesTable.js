import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/index';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  convertNumber(value) {
    return Number(value).toFixed(2);
  }

  handleClick({ target }) {
    const { name } = target;
    const { dispatch, wallet } = this.props;
    const { expenses } = wallet;
    const index = expenses.findIndex((element) => element.description === name);
    dispatch(index);
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
          <td>{ value }</td>
          <td>{ name }</td>
          <td>{ this.convertNumber(ask) }</td>
          <td>{ this.convertNumber(value * ask) }</td>
          <td>Real</td>
          <td>
            <button
              name={ description }
              type="button"
              data-testid="delete-btn"
              onClick={ this.handleClick }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
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
  wallet: PropTypes.objectOf(PropTypes.array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (state) => dispatch(removeExpense(state)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
