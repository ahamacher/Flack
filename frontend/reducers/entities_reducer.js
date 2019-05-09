import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import messagesReducer from "./messages_recuder";
import channelsReducer from "./channels_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  channels: channelsReducer,
  messages: messagesReducer
});

export default entitiesReducer;
