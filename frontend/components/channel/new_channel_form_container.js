import { connect } from "react-redux";
import { createChannel } from "../../actions/channel_actions";
import { createChannelModal, closeModal } from "../../actions/modal_actions";
import NewChannelForm from "./new_channel_form";

const mapStateToProps = (state, ownProps) => {
  const { errors } = state;
  return {
    modToggle: ownProps.toggle,
    channelConnection: ownProps.channelConnection,
    errors: errors.channel
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  createChannelModal: () => dispatch(createChannelModal()),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelForm);
