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
  default:
    return state;
  }
};

export default wallet;
