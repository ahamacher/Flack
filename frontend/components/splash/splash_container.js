import { connect } from "react-redux";
import { logout, login } from "../../actions/session_actions";
import Splash from "./splash";

const mapStateToProps = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
