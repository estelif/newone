document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');
    const timeInfo = document.getElementById('time-info');
    const sunInfo = document.getElementById('sun-info');
    const mapDiv = document.getElementById('map');
    
    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }
    
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
        
    if (response.ok) {
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.city}, ${data.country}</h2>
            <div class="weather-main">
                <img src="${data.icon}" alt="Weather Icon">
                <div class="temp-container">
                    <p class="temperature">${Math.round(data.temperature)}°C</p>
                    <p class="description">${data.description}</p>
                </div>
            </div>
            <div class="weather-details">
                <p><strong>Feels Like:</strong> ${Math.round(data.feels_like)}°C</p>
                <p><strong>Humidity:</strong> ${data.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.pressure} hPa</p>
                <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
                <p><strong>Precipitation:</strong> ${data.rain} mm</p>
            </div>
        `;

        timeInfo.innerHTML = `
            <h2>Local Time</h2>
            <p class="time">${new Date(data.localTime).toLocaleTimeString()}</p>
            <p class="timezone">Timezone: ${data.timezone}</p>
        `;

        sunInfo.innerHTML = `
            <h2>Sun Schedule</h2>
            <p><strong>Sunrise:</strong> ${data.sunrise}</p>
            <p><strong>Sunset:</strong> ${data.sunset}</p>
            <p><strong>Day Length:</strong> ${data.day_length} hours</p>
        `;

        const coordinates = data.coordinates;
        const map = new google.maps.Map(mapDiv, {
            center: { lat: coordinates.lat, lng: coordinates.lon },
            zoom: 10
        });
        
    } else {
        weatherInfo.innerHTML = `<p class="error">${data.error}</p>`;
        timeInfo.innerHTML = '';
        sunInfo.innerHTML = '';
    }
    
});