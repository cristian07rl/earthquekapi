class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.string :usgs_id
      t.text :body

      t.timestamps
    end
    add_foreign_key :comments, :features, column: :usgs_id, primary_key: :usgs_id
    add_index :comments, :usgs_id
  end
end
