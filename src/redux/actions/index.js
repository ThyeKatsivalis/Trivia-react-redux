import { callData } from '../../services/opentdbAPI';

export const SAVE_API = 'SAVE_API';

export const saveName = (name) => ({
  type: 'LOGIN_NAME',
  payload: name,
});

export const saveEmail = (email) => ({
  type: 'LOGIN_EMAIL',
  payload: email,
});

export const saveAPI = (token) => ({
  type: 'SAVE_API',
  payload: token,
});

export const clearToken = () => ({
  type: 'CLEAR_TOKEN',
});

export const setScore = (score) => ({
  type: 'SCORE',
  payload: score,
});

export const fetchToken = () => async (dispatch) => {
  const returnToken = await callData();
  const { token } = returnToken;
  dispatch(saveAPI(token));
  localStorage.setItem('token', token);
};

export const removeToken = () => async (dispatch) => {
  dispatch(clearToken());
  localStorage.removeItem('token');
};
