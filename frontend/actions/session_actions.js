/* eslint-disable no-shadow */
import * as ApiUtils from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const login = user => dispatch =>
  ApiUtils.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveSessionErrors(err))
  );
export const signup = user => dispatch =>
  ApiUtils.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveSessionErrors(err))
  );
export const logout = () => dispatch =>
  ApiUtils.logout().then(() => dispatch(logoutCurrentUser()));

export const clearSession = () => dispatch => dispatch(clearSessionErrors());
