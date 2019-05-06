// remember to come back later and add a channelId to the fetch all messages
// currently only grabbing ALL messages since testing with one channel.

export const fetchMessages = () => (
  $.ajax({
    method: "GET",
    url: `/api/messages`
  })
)

export const fetchMessage = messageId => (
  $.ajax({
    method: "GET",
    url: `/api/messages/${messageId}`
  })
);

export const createMessage = message => (
  $.ajax({
    method: "POST",
    url: `/api/messages`,
    data: { message }
  })
);
