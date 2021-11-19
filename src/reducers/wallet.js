const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_WALLET_INFORMATIONS':
    return ({
      ...state,
      wallet: action.payload,
    });
  default:
    return state;
  }
};

export default wallet;
