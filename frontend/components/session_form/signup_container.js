import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  const noEmail = { email: '' };

  
  let email;
  if (!ownProps.location.state){
    email = noEmail;
  } else {
    email = ownProps.location.state.email;
  }

  return { email };
};

const mapDispatchToProps = dispatch => ({
  action: user => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
