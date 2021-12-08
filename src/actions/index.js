export const setUserInformations = (payload) => ({
  type: 'SET_USER_INFORMATIONS',
  payload,
});

export const setWallet = (payload) => ({
  type: 'SET_WALLET',
  payload,
});

export const removeExpense = (payload) => ({
  type: 'REMOVE_EXPENSE',
  payload,
});

export const showEdit = (payload) => ({
  type: 'SHOW_EDIT',
  payload,
});

export const setEdited = (payload) => ({
  type: 'SET_EDITED',
  payload,
});

export const requestCurrency = () => ({
  type: 'REQUEST_CURRENCY',
});

export const requestCurrencySuccess = (payload) => ({
  type: 'REQUEST_CURRENCY_SUCCESS',
  payload,
});

export const requestCurrencyError = (payload) => ({
  type: 'REQUEST_CURRENCY_ERROR',
  payload,
});
