import * as ChannelApiUtils from "../util/channel_util";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
export const CLEAR_CHANNEL_ERRORS = "CLEAR_CHANNEL_ERRORS";

const receiveAllChannels = channels => ({
  type: RECEIVE_ALL_CHANNELS,
  channels
});

const receiveChannel = ({channel, messages, users}) => ({
  type: RECEIVE_CHANNEL,
  channel,
  messages,
  users
});

const receiveChannelErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const clearChannelErrors = () => ({
  type: CLEAR_CHANNEL_ERRORS
});

//thunky town

export const fetchChannels = () => dispatch =>
  ChannelApiUtils.fetchChannels().then(channels =>
    dispatch(receiveAllChannels(channels))
  );

export const fetchChannel = channelId => dispatch =>
  ChannelApiUtils.fetchChannel(channelId).then(
    payload => dispatch(receiveChannel(payload)),
    err => dispatch(receiveChannelErrors(err))
  );

export const createChannel = channel => dispatch =>
  ChannelApiUtils.createChannel(channel).then(
    channel => dispatch(receiveChannel(channel)),
    err => dispatch(receiveChannelErrors(err))
  );
