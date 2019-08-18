export const fetchChannels = () => (
  $.ajax({
    method: "GET",
    url: "/api/channels"
  })
)

export const createChannel = channel => (
  $.ajax({
    method: "POST",
    url: "/api/channels",
    data: { channel }
  })
)

export const fetchChannel = channelId => (
  $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}`
  })
)

export const joinChannel = channelId => (
  $.ajax({
    method: "PATCH",
    url: `/api/channels/${channelId}`
  })
)
