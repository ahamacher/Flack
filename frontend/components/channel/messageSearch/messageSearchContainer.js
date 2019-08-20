import { connect } from "react-redux";
import { joinChannel } from "../../../actions/channel_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { fetchMessages } from "../../../actions/message_actions";
import { createChannelModal, closeModal, searchModal } from "../../../actions/modal_actions";
import SearchModal from "./messageSearch";

const mapStateToProps = (state, ownProps) => {
  const { entities, session } = state;
  let users = [];
  if (entities.users) {
    users = Object.keys(entities.users).map(id => entities.users[id]);
  }
  let messages = [];
  if (entities.messages.searchResults) {
    messages = Object.keys(entities.messages.searchResults).map(id => entities.messages.searchResults[id]);
  }
  return {
    modToggle: ownProps.toggle,
    channels: entities.channels,
    channelConnection: ownProps.channelConnection,
    users,
    currentUser: session.id,
    messages
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  createChannelModal: () => dispatch(createChannelModal()),
  closeModal: () => dispatch(closeModal()),
  fetchUsers: () => dispatch(fetchUsers()),
  joinChannel: channelId => dispatch(joinChannel(channelId)),
  fetchChannels: () => dispatch(fetchChannels()),
  fetchMessages: query => dispatch(fetchMessages(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchModal);
