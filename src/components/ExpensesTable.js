import PropTypes from "prop-types"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  convertNumber(value) {
    return Number(value).toFixed(2);
  }

  renderTableItem() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return expenses.map((element) => {
      const { id, description, tag, method, value, exchangeRates, currency } = element;
      const { name, ask } = exchangeRates[currency];
      return (
        <tr key={ id } className="list">
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ name }</td>
          <td>{ this.convertNumber(ask) }</td>
          <td>{ this.convertNumber(value * ask) }</td>
          <td>Real</td>
          {/* <td>{ value }</td> */}
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
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(ExpensesTable);
