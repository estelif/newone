require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'Please provide a city name.' });
    }

    try {
        // 1. weather info
        const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;

        // 2. rain mm
        const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
        const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`;
        const rainResponse = await axios.get(weatherStackUrl);
        const rainData = rainResponse.data;

        // 3. Time api
        const { lat, lon } = weatherData.coord;
        const timeUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;
        const timeResponse = await axios.get(timeUrl);
        const timeData = timeResponse.data;

        // 4. Sunrise sunset api 
        const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
        const sunResponse = await axios.get(sunUrl);
        const sunData = sunResponse.data.results;

        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
            coordinates: weatherData.coord,
            feels_like: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            wind_speed: weatherData.wind.speed,
            country: weatherData.sys.country,
            rain: rainData.current.precip || 0,
            
            localTime: timeData.dateTime,
            timezone: timeData.timeZone,
            
            sunrise: new Date(sunData.sunrise).toLocaleTimeString(),
            sunset: new Date(sunData.sunset).toLocaleTimeString(),
            day_length: sunData.day_length
        });
    } catch (error) {
        console.error('API Error:', error.message);
        let errorMessage = 'An error occurred while fetching data.';
        
       
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
// const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`;
// const timeUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;
// const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
// icon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
// OPENWEATHER_API_KEY="49799753db812f48461cf395acef3607"
// WEATHERSTACK_API_KEY="c1f36168220d366aa29060415f9764f5"
// GOOGLEMAP_API_KEY="AIzaSyBDfJPOdLftuqg34m36MiHLQMjaHe9N62Y"
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDfJPOdLftuqg34m36MiHLQMjaHe9N62Y&callback=initMap" async defer></script>
