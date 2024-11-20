const apiKey = '5d2d99fe76f47cdabb166dec58249fc1';
const weatherButton = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

weatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeatherData(city);
    } else {
        alert('Per favore, inserisci una città');
    }
});

function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Città non trovata');
            }
            return response.json();
        })
        .then(data => {
            const { name, main, weather, wind } = data;

            locationElement.textContent = `Meteo per: ${name}`;
            temperatureElement.textContent = `Temperatura: ${main.temp} °C`;
            descriptionElement.textContent = `Descrizione: ${weather[0].description}`;
            humidityElement.textContent = `Umidità: ${main.humidity}%`;
            windElement.textContent = `Vento: ${wind.speed} m/s`;

            changeBackgroundGradient(weather[0].main);

            weatherInfo.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

function changeBackgroundGradient(weatherCondition) {
    let gradient;

    switch(weatherCondition.toLowerCase()) {
        case 'clear':
            gradient = 'linear-gradient(to right, #ff7e5f, #feb47b)';
            break;
        case 'clouds':
            gradient = 'linear-gradient(to right, #b0c6d3, #5f6368)'; 
            break;
        case 'rain':
            gradient = 'linear-gradient(to right, #5f6368, #4b6cb7)'; 
            break;
        case 'snow':
            gradient = 'linear-gradient(to right, #76b8c7, #a8d0e6)'; 
            break;
        case 'thunderstorm':
            gradient = 'linear-gradient(to right, #4e4e4e, #232323)'; 
            break;
        case 'drizzle':
            gradient = 'linear-gradient(to right, #6f7b8f, #a7c0d4)'; 
            break;
        default:
            gradient = 'linear-gradient(to right, #6a11cb, #2575fc)';
            break;
    }

    document.body.style.background = gradient;
}
