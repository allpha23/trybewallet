/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setWallet } from '../actions/index';
import getExchangeRates from '../services/currencyApi';

const INITIAL_STATE = {
  id: 0,
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: {},
};

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getExchangeRates();
  }

  async onSubmit() {
    const { id } = this.state;
    const { dispatch } = this.props;
    const api = await getExchangeRates();
    this.setState({ exchangeRates: api });
    dispatch(this.state);
    this.setState({ ...INITIAL_STATE, id: id + 1 });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  selectCurrencies() {
    const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { currency } = this.state;

    return (
      // eslint-disable-next-line react/self-closing-comp
      <select
        data-testid="currency-input"
        type="text"
        name="currency"
        value={ currency }
        onChange={ this.handleChange }
      >
        { currencies.map((value) => (
          <option key={ value }>{ value }</option>
        )) }
      </select>
    );
  }

  render() {
    const { value, description } = this.state;

    return (
      <form>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        {this.selectCurrencies()}
        <select name="method" data-testid="method-input" onChange={ this.handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input" onChange={ this.handleChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.onSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (state) => dispatch(setWallet(state)),
});

ExpensesForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpensesForm);
