class AddSubtitleToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :subtitle, :text
  end
end
