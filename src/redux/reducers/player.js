const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SCORE':
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
