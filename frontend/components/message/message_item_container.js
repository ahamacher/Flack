import { connect } from "react-redux";
import MessageItem from "./message_item";

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageItem);
