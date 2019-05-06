json.set! "message" do
  json.partial! "api/messages/message", message: @message
end
json.set! "user" do
  json.extract! @message.user, :id, :username
end