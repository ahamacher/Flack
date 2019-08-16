import { connect } from "react-redux";
import { createDmModal } from "../../actions/modal_actions";
import DmList from "./dm_list";

const mapStateToProps = ({ session, entities }, ownProps) => {
  const currentUserId = session.id;
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

  return {
    currentChannel: session.channelId,
    channel: ownProps.channel,
    channelConnection: ownProps.channelConnection,
    channels: filtered
  };
};

const mapDispatchToProps = dispatch => ({
  DmModal: () => dispatch(createDmModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DmList);
