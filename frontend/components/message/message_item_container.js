import { connect } from "react-redux";
import { removeMessage, updateMessage } from "../../actions/message_actions";
import MessageItem from "./message_item";

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return({
    message: ownProps.message,
    users: state.entities.users
  })
};

const mapDispatchToProps = dispatch => ({
  updateMessage: message => dispatch(updateMessage(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageItem);
