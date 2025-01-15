# Weather App

A comprehensive weather dashboard that combines data from multiple APIs to provide detailed information about weather, time, and air quality for any city.

## Features

- Weather information (OpenWeather API)
- Precipitation data (WeatherStack API)
- Local time and timezone information (WorldTime API)
- Sunrise/sunset information (Sunset Sunrise API)
- Interactive map integration (Google Maps)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install express axios dotenv
   ```

3. Create a `.env` file in the root directory with API keys:

4. Start the server:

5. Access the application at `http://localhost:3000`

## API Integration Details

### 1. OpenWeather API
- Provides basic weather data (temperature, humidity, etc.)
- Endpoint: `api.openweathermap.org/data/2.5/weather`
- Data retrieved: Temperature, description, humidity, pressure, wind speed

### 2. WeatherStack API
- Provides precipitation data
- Endpoint: `api.weatherstack.com/current`
- Data retrieved: Precipitation amount

### 3. WorldTime API
- Provides timezone and local time information
- Endpoint: `worldtimeapi.org/api/timezone`
- Data retrieved: Local time, timezone

### 4. Sunrise Sunset API
- Provides sunrise/sunset information
- Endpoint: `api.sunrise-sunset.org/json`
- Data retrieved: Sunset/sunrise and Day length


## Error Handling

- Input validation for city name
- API error catching and user feedback
- Fallback displays for failed API calls
- Responsive error messages
