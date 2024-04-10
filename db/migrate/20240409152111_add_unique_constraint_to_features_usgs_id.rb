class AddUniqueConstraintToFeaturesUsgsId < ActiveRecord::Migration[7.1]
  def change
    add_index :features, :usgs_id, unique: true
  end
end
