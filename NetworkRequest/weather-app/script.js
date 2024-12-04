const apiKey = 'YOUR_API_KEY';  // Replace with your API key from OpenWeatherMap or another weather API provider
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const locationElem = document.getElementById('location');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');

getWeatherBtn.addEventListener('click', async function() {
    const city = cityInput.value.trim();
    
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            alert('Error fetching weather data. Please try again.');
        }
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
}

function displayWeather(data) {
    locationElem.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
    descriptionElem.textContent = `Description: ${data.weather[0].description}`;
}
