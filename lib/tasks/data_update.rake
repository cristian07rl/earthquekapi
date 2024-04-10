# lib/tasks/data_update.rake

namespace :data do
  desc "Actualizar datos de la última hora"
  task update: :environment do
    require 'net/http'
    require 'json'

    # URL de la API para obtener datos actualizados
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'

    # Realizar solicitud HTTP GET a la API
    uri = URI(url)
    response = Net::HTTP.get(uri)

   # Parsear la respuesta JSON
    data = JSON.parse(response)

    # Extraer los datos relevantes del JSON
    earthquake_data = data['features']
    earthquake_data.reverse!
    # Iterar sobre cada evento y crear un registro en la base de datos
    records_created = 0
    earthquake_data.each do |event|
      # Extraer los datos relevantes del evento
      usgs_id = event['id']
      mag = event['properties']['mag']
      place = event['properties']['place']
      time = Time.at(event['properties']['time'] / 1000) # Convertir timestamp a formato de tiempo
      url = event['properties']['url']
      tsunami = event['properties']['tsunami']
      mag_type = event['properties']['magType']
      title = event['properties']['title']
      longitude = event['geometry']['coordinates'][0]
      latitude = event['geometry']['coordinates'][1]

      # Intentar crear un nuevo registro de Earthquake en la base de datos
      begin
        Feature.create!(
          usgs_id: usgs_id,
          mag: mag,
          place: place,
          time: time,
          url: url,
          tsunami: tsunami,
          mag_type: mag_type,
          title: title,
          longitude: longitude,
          latitude: latitude
        )
        records_created += 1 # Incrementar el contador de registros creados
        rescue ActiveRecord::RecordInvalid => e
        # Capturar excepciones de validación y mostrar un mensaje de advertencia
          puts "No se pudo crear el registro para el evento con usgs_id '#{usgs_id}': #{e.message}"
        end

      end
      puts "Se han creado #{records_created} registros de EarthquakeEvent en la base de datos."
  end
end
