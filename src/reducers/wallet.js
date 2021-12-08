const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editIsOn: false,
  index: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
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
  case 'SHOW_EDIT':
    return {
      ...state,
      editIsOn: action.payload.editIsOn,
      index: action.payload.index,
    };
  case 'SET_EDITED':
    state.expenses[state.index] = {
      ...state.expenses[state.index],
      ...action.payload,
    };
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
