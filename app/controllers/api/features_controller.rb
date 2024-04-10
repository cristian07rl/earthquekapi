class Api::FeaturesController < ApplicationController
  before_action :set_features, only: [:show, :update, :destroy]

  # GET /features
  def index
    page = params[:page].to_i.positive? ? params[:page].to_i : 1
    per_page = params[:per_page].to_i.positive? ? params[:per_page].to_i : 10
    mag_type_filter = params[:mag_type] || []

    # Validar que per_page sea <= 1000
    if per_page > 1000
      render json: { error: 'per_page cannot be greater than 1000' }, status: :bad_request
      return
    end

    # Calcular offset basado en la página y la cantidad por página
    offset = (page - 1) * per_page

    # Construir la consulta ActiveRecord con el filtro de mag_type
    query = Feature
    query = query.where(mag_type: mag_type_filter) if mag_type_filter.present?
    query = query.order(id: :desc)
    # Obtener el total de eventos que cumplen el filtro de mag_type
    total_filtered_events = query.count
    totalpage = total_filtered_events.to_f/per_page
    totalpage=totalpage.ceil
    # Aplicar paginación a la consulta
    query = query.limit(per_page).offset(offset)
    @features = query.all

    events_data = @features.map { |event| serialize_event(event) }

    render json: {
      data: events_data,
      pagination: {
        current_page: page,
        total: totalpage,
        per_page: per_page
      }
    }
  end

  # GET /features/1
  def show
    if @feature.nil?
      render json: { error: 'Feature not found' }, status: :not_found
    else
      serialized_event = serialize_event(@feature)
      render json: serialized_event
    end
  end

  # POST /features
  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      render json: @feature, status: :created, location: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /features/1
  def update
    if @feature.update(feature_params)
      render json: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # DELETE /features/1
  def destroy
    @feature.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_features
      @feature = Feature.find_by(usgs_id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feature_params
      params.require(:feature).permit(:usgs_id, :mag, :place, :time, :url, :tsunami, :mag_type, :title, :longitude, :latitude)
    end

    def serialize_event(event)
      {
        id: event.id,
        type: 'feature',
        attributes: {
          external_id: event.usgs_id,
          magnitude: event.mag,
          place: event.place,
          time: event.time.strftime("%Y-%m-%d %H:%M:%S"),
          tsunami: event.tsunami == 1, # Convertir tsunami a booleano
          mag_type: event.mag_type,
          title: event.title,
          coordinates: {
            longitude: event.longitude,
            latitude: event.latitude
          }
        },
        links: {
          external_url: event.url
        }
      }
    end
end
