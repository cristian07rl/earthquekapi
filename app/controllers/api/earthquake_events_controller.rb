class Api::EarthquakeEventsController < ApplicationController
  before_action :set_earthquake_event, only: %i[ show update destroy ]

  # GET /earthquake_events
  def index
    @earthquake_events = EarthquakeEvent.all
    render json: @earthquake_events
  end

  # GET /earthquake_events/1
  def show
    render json: @earthquake_event
  end

  # POST /earthquake_events
  def create
    @earthquake_event = EarthquakeEvent.new(earthquake_event_params)

    if @earthquake_event.save
      render json: @earthquake_event, status: :created, location: @earthquake_event
    else
      render json: @earthquake_event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /earthquake_events/1
  def update
    if @earthquake_event.update(earthquake_event_params)
      render json: @earthquake_event
    else
      render json: @earthquake_event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /earthquake_events/1
  def destroy
    @earthquake_event.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_earthquake_event
      @earthquake_event = EarthquakeEvent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def earthquake_event_params
      params.require(:earthquake_event).permit(:usgs_id, :mag, :place, :time, :url, :tsunami, :mag_type, :title, :longitude, :latitude)
    end
end
