import * as ApiUtils from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'ERRORS';

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const login = user => (
  ApiUtils.login(user).then(user => dispatch(receiveCurrentUser(user)),
  err => dispatch(receiveSessionErrors(err)))
);
export const signup = user => (
  ApiUtils.signup(user).then(user => dispatch(receiveCurrentUser(user)), 
  err => dispatch(receiveSessionErrors(err)))
);
export const logout = () => (
  ApiUtils.logout().then( () => dispatch(logoutCurrentUser()))
);
