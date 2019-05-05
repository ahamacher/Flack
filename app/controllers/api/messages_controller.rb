class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
  end
  
  def show
    @message = Message.find_by(params[:id])
   end

   def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      ## broadcasting the message to the "messagesChannel"
      ## can work on multiple dynamic channels later
      ActionCable.server.broadcast(
        "MessagesChannel",
        id: @message.id,
        body: @message.body,
        author_id: @message.author_id,
        channel_id: @message.channel_id
      )
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 401
    end

   end

   def update
    ## later
   end

   def destroy
    ## later
   end

   private

   def message_params
    params.require(:message).permit(:body, :channel_id, :parent_id)
   end
  
end
