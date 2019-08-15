import { connect } from "react-redux";
import { createDmModal } from "../../actions/modal_actions";
import DmList from "./dm_list";

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentChannel: session.channelId,
    channel: ownProps.channel
  };
};

const mapDispatchToProps = dispatch => ({
  DmModal: () => dispatch(createDmModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DmList);
