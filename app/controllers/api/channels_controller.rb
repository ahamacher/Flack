class Api::ChannelsController < ApplicationController
  # before_filter :redirect_to_https

  def redirect_to_https
    redirect_to :protocol => "https://" unless (request.ssl? || request.local?)
  end

  def index
    @channels = Channel.all.includes(:users)
  end

  def show
    @channel = Channel.includes(:messages, :users).find_by(id: params[:id])
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.author_id = current_user.id
    if params["channel"]["dm_receiver"] != nil
      recipient_id = params["channel"]["dm_receiver"]
    end

    if @channel.save
      if recipient_id
        ChannelJoin.create({channel_id: @channel.id, user_id: @channel.author_id})
        ChannelJoin.create({channel_id: @channel.id, user_id: recipient_id})
      else
        ChannelJoin.create({channel_id: @channel.id, user_id: @channel.author_id})
      end
      render 'api/channels/show'
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    ChannelJoin.create({channel_id: params[:id], user_id: current_user.id})
    @channel = Channel.includes(:messages, :users).find_by(id: params[:id])
    render 'api/channels/show'
  end

  ## destroy / update to come later

  private

  def channel_params
    params.require(:channel).permit(:name, :is_dm, :default, :subtitle)
  end

end
