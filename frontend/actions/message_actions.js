import * as MessageApiUtils from "../util/message_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const CLEAR_MESSAGE_ERRORS = "CLEAR_MESSAGE_ERRORS";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const receiveAllMessages = ({ messages, users }) => {
  return({
    type: RECEIVE_ALL_MESSAGES,
    messages,
    users
  });
};

export const deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId
});

export const receiveMessage = ({ message, user }) => ({
  type: RECEIVE_MESSAGE,
  message,
  user
});

export const receiveMessageErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors
});

const clearMessageErrors = () => ({
  type: CLEAR_MESSAGE_ERRORS
});

// taking it to thunky town

export const fetchMessages = () => dispatch =>
  MessageApiUtils.fetchMessages().then(payload =>
    dispatch(receiveAllMessages(payload))
  );

// returning more than just a message, user information coming back as well
export const fetchMessage = message => dispatch =>
  MessageApiUtils.fetchMessage(message).then(
    payload => dispatch(receiveMessage(payload)),
    err => dispatch(receiveMessageErrors(err))
  );

export const createMessage = message => dispatch =>
  MessageApiUtils.createMessage(message).then(
    message => dispatch(receiveMessage(message)),
    err => dispatch(receiveMessageErrors(err))
  );

export const updateMessage = message => dispatch =>
  MessageApiUtils.updateMessage(message).then(
    message => dispatch(receiveMessage(message)),
    err => dispatch(receiveMessageErrors(err))
  );

export const removeMessage = messageId => dispatch =>
  MessageApiUtils.deleteMessage(messageId).then(messageId =>
    dispatch(deleteMessage(messageId))
  );

export const clearMessage = () => dispatch => dispatch(clearMessageErrors());
