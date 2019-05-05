class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "MessagesChannel"
  end

  def speak(payload)
    message = Message.create(
      body: payload['body'],
      author_id: payload['author_id'],
      channel_id: payload['channel_id'],
      parent_id: payload['parent_id']
    )
    MessagesChannel.broadcast_to('MessagesChannel', 
        { 
          message: message.body, 
          author_id: message.author_id,
          channel_id: message.channel_id,
          parent_id: message.parent_id
        })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
