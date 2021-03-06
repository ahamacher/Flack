class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all.where("body like ?", "%#{params[:input]}%").includes(:user)
  end
  
  def show
    @message = Message.where(id: params[:id]).includes(:user)
   end

   def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      data = {
        type: "message",
        message: {
          id: @message.id,
          body: @message.body,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          timestamp: @message.created_at.localtime.strftime("%l:%M %p"),
          parent_id: @message.parent_id,
          username: @message.user.username
        }
      }
      ActionCable.server.broadcast("MessagesChannel_#{@message.channel_id}:messages", data)
      
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 401
    end
   end

   def update
    @message = current_user.messages.find_by(id: params[:id])
    if @message.update_attributes(body: params[:message][:body])
      data = {
        type: "message",
        message: {
          id: @message.id,
          body: @message.body,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          timestamp: @message.created_at.localtime.strftime("%l:%M %p"),
          parent_id: @message.parent_id
        }
      }
      ActionCable.server.broadcast("MessagesChannel_#{@message.channel_id}:messages", data)
      
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 401
    end
   end

   def destroy
    @message = current_user.messages.find_by(id: params[:id])
    if @message.delete
      data = {delete: @message.id, type: "delete"}
      ActionCable.server.broadcast("MessagesChannel", data)
      render json: @message.id
    else
      render json: ["message not found"], status: 404
    end
   end

   private

   def message_params
    params.require(:message).permit(:body, :channel_id, :parent_id)
   end
  
end
