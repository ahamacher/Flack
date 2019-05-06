import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_ALL_MESSAGES } from "../actions/message_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser
      });
    case RECEIVE_ALL_MESSAGES:
      return Object.assign({}, action.users, state);
    default:
      return state;
  }
};

export default usersReducer;
