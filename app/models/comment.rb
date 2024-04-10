class Comment < ApplicationRecord
  belongs_to :feature, foreign_key: 'usgs_id', primary_key: 'usgs_id'
end
