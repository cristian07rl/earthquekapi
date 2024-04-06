# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
EarthquakeEvent.destroy_all

5.times do
  EarthquakeEvent.create(

    usgs_id: Faker::Lorem.sentence(word_count: 3),
    mag:1.43,
    place:Faker::Lorem.sentence(word_count: 3),
    time:1712354507750,
    url:"https://earthquake.usgs.gov/earthquakes/eventpage/nc74029901",
    tsunami:0,
    mag_type:"md",
    title: Faker::Lorem.sentence(word_count: 3),
    latitude: 3.226,
    longitude: 15.2158

  )
end

# {
#    "id":"nc74029901",
#    "properties":{
#       "mag":1.43,
#       "place":"12 km SSW of Tres Pinos, CA",
#       "time":1712354507750,
#       "url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc74029901",
#       "tsunami":0,
#       "magType":"md",
#       "title":"M 1.4 - 12 km SSW of Tres Pinos, CA"
#    },
#    "geometry":{
#       "coordinates":[
#          -121.3529968,
#          36.6816673,
#          -0.22
#       ]
#    }
# }
