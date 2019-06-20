import { connect } from "react-redux";
import { createChannel } from "../../util/channel_util";
import NewChannelForm from "./new_channel_form";

const mapStateToProps = (state, ownProps) => {
  return {
    modToggle: ownProps.toggle,
    channelConnection: ownProps.channelConnection
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelForm);
