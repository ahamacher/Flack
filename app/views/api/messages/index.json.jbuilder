json.set! "messages" do
  @messages.each do |message|
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
    end
  end
end
json.set! "users" do
  @messages.each do |message|
    json.set! message.user.id do
      json.extract! message.user, :id, :username
    end
  end
end