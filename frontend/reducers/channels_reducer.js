import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL
} from "../actions/channel_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      debugger;
      return action.channels;
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { [action.channel.id]: action.channel });
    default:
      return state;
  }
};

export default channelsReducer;
