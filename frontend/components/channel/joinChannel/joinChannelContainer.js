import { connect } from "react-redux";
import { createChannel, joinChannel, fetchChannels } from "../../../actions/channel_actions";
import { fetchUsers } from "../../../actions/user_actions";
import { createChannelModal, closeModal } from "../../../actions/modal_actions";
import JoinChannelForm from "./joinChannel";

const mapStateToProps = (state, ownProps) => {
  const { entities, session } = state;
  let users = [];
  if (entities.users) {
    users = Object.keys(entities.users).map(id => entities.users[id]);
  }
  return {
    modToggle: ownProps.toggle,
    channels: entities.channels,
    channelConnection: ownProps.channelConnection,
    users,
    currentUser: session.id
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  createChannelModal: () => dispatch(createChannelModal()),
  closeModal: () => dispatch(closeModal()),
  fetchUsers: () => dispatch(fetchUsers()),
  joinChannel: channelId => dispatch(joinChannel(channelId)),
  fetchChannels: () => dispatch(fetchChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinChannelForm);
