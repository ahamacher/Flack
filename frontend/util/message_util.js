// remember to come back later and add a channelId to the fetch all messages
// currently only grabbing ALL messages since testing with one channel.

export const fetchMessages = input => (
  $.ajax({
    method: "GET",
    url: `/api/messages`,
    data: input
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

export const updateMessage = message => (
  $.ajax({
    method: "PATCH",
    url: `/api/messages/${message.id}`,
    data: { message }
  })
);

export const deleteMessage = messageId => (
  $.ajax({
    method: "DELETE",
    url: `/api/messages/${messageId}`
  })
);
