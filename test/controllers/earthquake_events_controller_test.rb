require "test_helper"

class EarthquakeEventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @earthquake_event = earthquake_events(:one)
  end

  test "should get index" do
    get earthquake_events_url, as: :json
    assert_response :success
  end

  test "should create earthquake_event" do
    assert_difference("EarthquakeEvent.count") do
      post earthquake_events_url, params: { earthquake_event: { latitude: @earthquake_event.latitude, longitude: @earthquake_event.longitude, mag: @earthquake_event.mag, mag_type: @earthquake_event.mag_type, place: @earthquake_event.place, time: @earthquake_event.time, title: @earthquake_event.title, tsunami: @earthquake_event.tsunami, url: @earthquake_event.url, usgs_id: @earthquake_event.usgs_id } }, as: :json
    end

    assert_response :created
  end

  test "should show earthquake_event" do
    get earthquake_event_url(@earthquake_event), as: :json
    assert_response :success
  end

  test "should update earthquake_event" do
    patch earthquake_event_url(@earthquake_event), params: { earthquake_event: { latitude: @earthquake_event.latitude, longitude: @earthquake_event.longitude, mag: @earthquake_event.mag, mag_type: @earthquake_event.mag_type, place: @earthquake_event.place, time: @earthquake_event.time, title: @earthquake_event.title, tsunami: @earthquake_event.tsunami, url: @earthquake_event.url, usgs_id: @earthquake_event.usgs_id } }, as: :json
    assert_response :success
  end

  test "should destroy earthquake_event" do
    assert_difference("EarthquakeEvent.count", -1) do
      delete earthquake_event_url(@earthquake_event), as: :json
    end

    assert_response :no_content
  end
end
