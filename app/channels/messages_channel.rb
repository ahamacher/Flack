class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from stream_channel
  end

  def speak(payload)
    # message = 
    Message.create(
      body: payload['body'],
      author_id: payload['author_id'],
      channel_id: payload['channel_id'],
      parent_id: payload['parent_id']
    )
  end

  def stream_channel
    "MessagesChannel_#{params['room']}:messages"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
