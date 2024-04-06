class CreateEarthquakeEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :earthquake_events do |t|
      t.string :usgs_id
      t.float :mag
      t.string :place
      t.datetime :time
      t.string :url
      t.boolean :tsunami
      t.string :mag_type
      t.string :title
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
