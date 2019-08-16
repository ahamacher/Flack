import * as UserApiUtils from "../util/user_util";

export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = payload => ({
  type: RECEIVE_USERS,
  users: payload.users
});

export const fetchUsers = () => dispatch =>
  UserApiUtils.fetchUsers().then(users => dispatch(receiveUsers(users)));
