class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :author_id, null: false
      t.boolean :is_dm, null: false, default: false
      t.boolean :default, null: false, default: false
      t.timestamps
    end
    add_index :channels, :author_id
  end
end
