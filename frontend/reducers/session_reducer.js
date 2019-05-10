import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "../actions/session_actions";
import { RECEIVE_CHANNEL } from "../actions/channel_actions";

const nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { id: action.currentUser.id })
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { channelId: action.channel.id })
    case LOGOUT_CURRENT_USER:
      return nullUser;
    default:
      return state;
  }
};

export default sessionReducer;
