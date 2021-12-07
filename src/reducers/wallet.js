const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case 'REQUEST_CURRENCY_SUCCESS':
    return {
      ...state,
      currencies: Object.keys(action.payload.exchangeRates),
    };
  case 'REMOVE_EXPENSE':
    if (state.expenses.length === 0) {
      return {
        ...state,
        expenses: [],
      };
    }
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
