import { connect } from "react-redux";
import MessageItem from "./message_item";

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return({
    message: ownProps.message,
    users: state.entities.users
  })
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageItem);
