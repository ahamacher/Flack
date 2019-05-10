class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      Channel.where(default: true).each do |channel|
        ChannelJoin.create(user_id: @user.id, channel_id: channel.id)
      end
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show

  end

  def index
    @users = User.all
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
