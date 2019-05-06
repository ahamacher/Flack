class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "MessagesChannel"
  end

  def speak(payload)
    # message = 
    Message.create(
      body: payload['body'],
      author_id: payload['author_id'],
      channel_id: payload['channel_id'],
      parent_id: payload['parent_id']
    )

    # socket = { message: { 
    #             body: message.body, 
    #             author_id: message.author_id,
    #             channel_id: message.channel_id,
    #             parent_id: message.parent_id
    #           },
    #             type: 'message'
    #           }

    # MessagesChannel.broadcast_to('MessagesChannel', socket)
  end

  def load
    messages = Message.all
    socket = { messages: messages, type: 'messages'}
    MessagesChannel.broadcast_to('MessagesChannel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
