// Ganti dengan API key milikmu dari OpenWeatherMap
const API_KEY = 'YOUR_API_KEY_HERE';

const getWeatherBtn = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const weatherDiv = document.getElementById('weather');
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const iconEl = document.getElementById('icon');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Masukkan nama kota terlebih dahulu!');
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
        );

        if (!response.ok) {
            throw new Error('Kota tidak ditemukan');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        weatherDiv.classList.add('hidden');
    }
}

function displayWeather(data) {
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `Suhu: ${data.main.temp}°C`;
    descEl.textContent = `Cuaca: ${data.weather[0].description}`;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.classList.remove('hidden');
}
