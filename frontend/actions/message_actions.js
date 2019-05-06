import * as MessageApiUtils from "../util/message_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const CLEAR_MESSAGE_ERRORS = "CLEAR_MESSAGE_ERRORS";

export const receiveAllMessages = messages => ({
  type: RECEIVE_ALL_MESSAGES,
  messages
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
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
  MessageApiUtils.fetchMessages().then(messages =>
    dispatch(receiveAllMessages(messages))
  );

export const fetchMessage = message => dispatch =>
  MessageApiUtils.fetchMessage(message).then(
    message => dispatch(receiveMessage(message)),
    err => dispatch(receiveMessageErrors(err))
  );

export const createMessage = message => dispatch =>
  MessageApiUtils.createMessage(message).then(
    message => dispatch(receiveMessage(message)),
    err => dispatch(receiveMessageErrors(err))
  );

export const clearMessage = () => dispatch => dispatch(clearMessageErrors());
