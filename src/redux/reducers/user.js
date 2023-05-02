const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_NAME':
    return {
      ...state,
      name: action.payload,
    };
  case 'LOGIN_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
