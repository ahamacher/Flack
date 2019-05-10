import { connect } from "react-redux";
import ChannelItem from "./channel_item";

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentChannel: session.channelId,
    channel: ownProps.channel
  };
};

export default connect(
  mapStateToProps,
  null
)(ChannelItem);
