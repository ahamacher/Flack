import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Channel from "./channel";
import {
  fetchMessages,
  fetchMessage,
  createMessage,
  clearMessage,
  receiveMessage,
  receiveAllMessages,
  deleteMessage
} from "../../actions/message_actions";

const mapStateToProps = ({ entities, session }) => {
  let messages = [];
  if (entities.messages) {
    messages = Object.keys(entities.messages).map(id => entities.messages[id]);
  }
  return {
    currentUser: entities.users[session.id],
    users: entities.users,
    messages,
    channel_id: "MessagesChannel"
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchMessages: () => dispatch(fetchMessages()),
  fetchMessage: message => dispatch(fetchMessage(message)),
  createMessage: message => dispatch(createMessage(message)),
  clearMessage: () => dispatch(clearMessage()),
  receiveMessage: message => dispatch(receiveMessage(message)),
  deleteMessage: message => dispatch(deleteMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
