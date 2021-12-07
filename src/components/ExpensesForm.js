import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setWallet, requestCurrencySuccess } from '../actions/index';
import getExchangeRates from '../services/currencyApi';
import './ExpensesForm.css';

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
    this.getCurrency = this.getCurrency.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async onSubmit() {
    const { id } = this.state;
    const { dispatch } = this.props;
    const api = await getExchangeRates();
    this.setState({ exchangeRates: api });
    dispatch(this.state);
    this.setState({ ...INITIAL_STATE, id: id + 1 });
  }

  async getCurrency() {
    const { dispatchCurrency } = this.props;
    const api = await getExchangeRates();
    this.setState({ exchangeRates: api });
    dispatchCurrency(this.state);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  selectCurrencies() {
    const { currencies } = this.props;
    const { currency } = this.state;

    return (
      <label htmlFor="input-currency">
        Moeda:
        <select
          data-testid="currency-input"
          id="input-currency"
          type="text"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.filter((currencyEl) => currencyEl !== 'USDT').map((value) => (
            <option key={ value }>{ value }</option>
          )) }
        </select>
      </label>
    );
  }

  render() {
    const { value, description } = this.state;

    return (
      <form className="form-container">
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
  dispatchCurrency: (state) => dispatch(requestCurrencySuccess(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
