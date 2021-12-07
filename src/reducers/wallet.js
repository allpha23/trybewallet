const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_WALLET':
    return {
      ...state,
      expenses: state.expenses.concat(action.payload),
    };
  case 'REQUEST_CURRENCY_SUCCESS':
    return {
      ...state,
      currencies: Object.keys(action.payload.exchangeRates),
    };
  default:
    return state;
  }
};

export default wallet;
