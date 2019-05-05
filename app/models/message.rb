class Message < ApplicationRecord
  # validates :body, :author_id, :channel_id, presence: true
  belongs_to :user, foreign_key: :author_id, class_name: 'User'
end
