import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE,
  DELETE_MESSAGE
} from "../actions/message_actions";
import {
  RECEIVE_CHANNEL
} from "../actions/channel_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      if (!action.messages) {
        return null;
      }
      return action.messages;
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message.id]: action.message });
    case DELETE_MESSAGE:
      const newState = Object.assign({}, state);
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
