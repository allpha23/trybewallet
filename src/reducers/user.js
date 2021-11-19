const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_USER_INFORMATIONS':
    return ({
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    });
  default:
    return state;
  }
};

export default user;
