import { connect } from "react-redux";
import { login, clearSession } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
  email: ""
});

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(login(user)),
  clearSession: () => dispatch(clearSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
