const INITIAL_STATE = {
  token: '',
};

const api = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_API':
    return { ...state, token: action.payload };
  case 'CLEAR_TOKEN':
    return { ...state, token: '' };
  default:
    return state;
  }
};

export default api;
