import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE
} from "../actions/message_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages.messages;
    case RECEIVE_MESSAGE:
      debugger;
      return Object.assign({}, state, { [action.message.message.id]: action.message.message });
    default:
      return state;
  }
};

export default messagesReducer;
