class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.where(id: params[:id]).includes(:users, :messages)
    render "api/channel/show"
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.author_id = current_user.id
    if @channel.save
      ChannelJoin.create({channel_id: @channel.id, user_id: @channel.author_id})
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  ## destroy / update to come later

  private

  def channel_params
    params.require(:channel).permit(:name, :is_dm, :default)
  end

end
