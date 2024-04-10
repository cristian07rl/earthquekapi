class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :usgs_id
      t.float :mag
      t.string :place
      t.datetime :time
      t.string :url
      t.integer :tsunami
      t.string :mag_type
      t.string :title
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
