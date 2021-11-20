const INITIAL_STATE = {
  wallet: {
    currencies: ['BRL'],
    expenses: ['0'],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_WALLET_INFORMATIONS':
    return ({
      ...state,
      currencies: action.payload.currencies,
      expenses: action.payload.expenses,
    });
  default:
    return state;
  }
};

export default wallet;
