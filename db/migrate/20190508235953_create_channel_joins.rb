class CreateChannelJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_joins do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end
    add_index :channel_joins, :user_id
    add_index :channel_joins, :channel_id
  end
end
