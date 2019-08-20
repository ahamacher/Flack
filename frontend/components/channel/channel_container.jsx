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
import { fetchChannels, fetchChannel, createChannel } from "../../actions/channel_actions";
import { createChannelModal, joinChannelModal, searchModal } from "../../actions/modal_actions";

const mapStateToProps = ({ entities, session }) => {
  let currentUserId = session.id;
  let messages = [];
  if (entities.messages) {
    messages = Object.keys(entities.messages).map(id => entities.messages[id]);
  }
  let channels = [];
  const filtered = [];
  if (entities.channels) {
    channels = Object.keys(entities.channels).map(id => entities.channels[id]);
    channels.forEach(channel => {
      if (channel.ids.includes(currentUserId)) {
        filtered.push(channel);
      }
    });
  }
  let activeChannel = {name: ""};
  if (entities.channels[session.channelId]){
    activeChannel = entities.channels[session.channelId]
  }

  return {
    currentUser: entities.users[session.id],
    users: entities.users,
    messages,
    channels: filtered,
    currentChannel: session.channelId,
    activeChannel
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchMessages: query => dispatch(fetchMessages(query)),
  fetchMessage: message => dispatch(fetchMessage(message)),
  createMessage: message => dispatch(createMessage(message)),
  clearMessage: () => dispatch(clearMessage()),
  receiveMessage: message => dispatch(receiveMessage(message)),
  deleteMessage: message => dispatch(deleteMessage(message)),
  fetchChannels: () => dispatch(fetchChannels()),
  fetchChannel: channelId => dispatch(fetchChannel(channelId)),
  createChannelModal: () => dispatch(createChannelModal()),
  joinChannelModal: () => dispatch(joinChannelModal()),
  searchModal: () => dispatch(searchModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
