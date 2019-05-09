# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  author_id  :integer          not null
#  is_dm      :boolean          default(FALSE), not null
#  default    :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, presence: true

  belongs_to :author,
  foreign_key: :author_id,
  class_name: "User"

  has_many :user_subscriptions, foreign_key: :channel_id, class_name: "ChannelJoin"
  has_many :users, through: :user_subscriptions
  has_many :messages, dependent: :destroy
end
