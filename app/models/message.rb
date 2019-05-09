# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  parent_id  :integer
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  # validates :body, :author_id, :channel_id, presence: true
  belongs_to :user, foreign_key: :author_id, class_name: 'User'
  belongs_to :channel
end
