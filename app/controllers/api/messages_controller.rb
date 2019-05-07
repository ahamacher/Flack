class Api::MessagesController < ApplicationController
  def index
    ## adding a .includes and a key will grab the though assosications as well in 1 query call
    @messages = Message.all.includes(:user)
  end
  
  def show
    @message = Message.find_by(params[:id]).includes(:user)
   end

   def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      ## broadcasting the message to the "messagesChannel"
      ## can work on multiple dynamic channels later

      data = {
        message: {
          id: @message.id,
          body: @message.body,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          timestamp: @message.created_at.localtime.strftime("%l:%M %p"),
          parent_id: @message.parent_id
        }
      }
      ActionCable.server.broadcast("MessagesChannel", data)
      
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 401
    end

   end

   def update
    
   end

   def destroy
    ## later
   end

   private

   def message_params
    params.require(:message).permit(:body, :channel_id, :parent_id)
   end
  
end
