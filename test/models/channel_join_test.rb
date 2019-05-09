# == Schema Information
#
# Table name: channel_joins
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ChannelJoinTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
