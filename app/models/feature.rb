class Feature < ApplicationRecord
  validates :usgs_id, uniqueness: true
  validates :mag, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  has_many :comments, dependent: :destroy, foreign_key: 'usgs_id', primary_key: 'usgs_id'

end
