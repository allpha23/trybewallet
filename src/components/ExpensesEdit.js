import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEdited, requestCurrencySuccess, showEdit } from '../actions/index';
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

class ExpensesEdit extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.getExpeses = this.getExpeses.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
    this.getExpeses();
  }

  async getCurrency() {
    const { dispatchCurrency } = this.props;
    const api = await getExchangeRates();
    this.setState({ exchangeRates: api });
    dispatchCurrency(this.state);
  }

  getExpeses() {
    const { expensesSelect, indexSelect } = this.props;
    this.setState({
      ...expensesSelect[indexSelect],
    });
  }

  handleClick() {
    const { dispatch, togleEdit } = this.props;
    const payload = {
      editIsOn: false,
      index: '',
    };

    dispatch(this.state);
    togleEdit(payload);
    this.setState({ ...INITIAL_STATE });
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
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (state) => dispatch(setEdited(state)),
  dispatchCurrency: (state) => dispatch(requestCurrencySuccess(state)),
  togleEdit: (state) => dispatch(showEdit(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesSelect: state.wallet.expenses,
  indexSelect: state.wallet.index,
});

ExpensesEdit.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchCurrency: PropTypes.func.isRequired,
  expensesSelect: PropTypes.func.isRequired,
  indexSelect: PropTypes.func.isRequired,
  togleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesEdit);
