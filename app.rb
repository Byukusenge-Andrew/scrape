#app.rb
require 'sinatra'
require 'rest-client'
require 'json'
require 'dotenv'

Dotenv.load

set :bind, '0.0.0.0'
set :port, 4567

before do
  headers 'Access-Control-Allow-Origin' => '*'
end

get '/search' do
  content_type :json
  
  query = params['query']
  return { error: 'Please enter a search term' }.to_json if query.nil? || query.empty?

  begin
    # First search for channels
    search_response = RestClient.get(
      'https://www.googleapis.com/youtube/v3/search',
      params: {
        key: ENV['YOUTUBE_API_KEY'],
        q: query,
        part: 'snippet',
        type: 'channel'
      }
    )

    search_data = JSON.parse(search_response.body)
    
    # Check if any channels were found
    if !search_data['items'] || search_data['items'].empty?
      return { error: 'No channels found matching your search' }.to_json
    end

    channel_ids = search_data['items'].map { |item| item['id']['channelId'] }

    # Get channel statistics
    channels_response = RestClient.get(
      'https://www.googleapis.com/youtube/v3/channels',
      params: {
        key: ENV['YOUTUBE_API_KEY'],
        id: channel_ids.join(','),
        part: 'statistics,snippet'
      }
    )

    channels_data = JSON.parse(channels_response.body)
    
    # Check if channel data was retrieved
    if !channels_data['items'] || channels_data['items'].empty?
      return { error: 'Could not retrieve channel information' }.to_json
    end

    # Map channels with their statistics
    channels = channels_data['items'].map do |item|
      {
        channel_id: item['id'],
        title: item['snippet']['title'],
        thumbnail: item['snippet']['thumbnails']['default']['url'],
        subscribers: item['statistics']['subscriberCount'].to_i,
        video_count: item['statistics']['videoCount'].to_i
      }
    end

    channels.to_json

  rescue RestClient::ExceptionWithResponse => e
    status e.http_code
    case e.http_code
    when 403
      { error: 'API quota exceeded or invalid API key' }.to_json
    when 404
      { error: 'Not found' }.to_json
    else
      { error: "API Error: #{e.message}" }.to_json
    end
  rescue RestClient::Exception => e
    status e.http_code
    { error: "Network Error: #{e.message}" }.to_json
  rescue StandardError => e
    status 500
    { error: "Server Error: #{e.message}" }.to_json
  end
end