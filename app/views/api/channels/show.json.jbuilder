# json.partial! 'api/channels/channel', channel: @channel
#isnt working for some reason???

json.channel do
  json.extract! @channel, :id, :name, :is_dm, :default
end

json.messages do
  @channel.messages.each do |message|
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
    end
  end
end

json.users do
  @channel.users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username, :email
    end
  end
end