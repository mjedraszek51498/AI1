const api_key = 'd150a3a333b9c5224cd4f01809eca185';


document.addEventListener('DOMContentLoaded', function () {
    const savedWeather = localStorage.getItem('currentWeather');

    if (savedWeather) {
        try {
            const data = JSON.parse(savedWeather);
            console.log('Loaded weather from localStorage:', data);

            // Update UI with saved weather data
            document.getElementById('city-name').innerHTML = `Pogoda w ${data.name}`;
            document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
            document.getElementById('pressure').innerHTML = `${data.main.pressure} hPa`;
            document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
            document.getElementById('description').innerHTML = data.weather[0].description;
            document.getElementById('icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.getElementById('icon').alt = data.weather[0].description;
        } catch (error) {
            console.error('Error parsing saved weather data:', error);
        }
    } else {
        console.log('No saved weather data found.');
    }
});
document.getElementById('submit').addEventListener('click', function() {
    let city = document.getElementById('city').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=pl`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // request is complete
            if (xhr.status === 200) { // request was successful
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('currentWeather', JSON.stringify(data));
                document.getElementById('city-name').innerHTML = `Pogoda w ${data.name}`;
                document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
                document.getElementById('pressure').innerHTML = `${data.main.pressure} hPa`;
                document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
                document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
                document.getElementById('description').innerHTML = data.weather[0].description;
                document.getElementById('icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                document.getElementById('icon').alt = data.weather[0].description;
            }
        }
    }
    xhr.send();


    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric&lang=pl`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const forecastContainer = document.getElementById('forecast');
            const forecasts = data.list.slice(0, 15);

            forecasts.forEach(forecast => {

                const date = new Date(forecast.dt * 1000);
                const dateStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })}`;


                const forecastCard = document.createElement('div');
                forecastCard.className = 'forecast-item';
                forecastCard.innerHTML = `
                            <h3>${dateStr}</h3>
                            <p><strong>Temperatura:</strong> ${forecast.main.temp}°C</p>
                            <p><strong>Ciśnienie:</strong> ${forecast.main.pressure} hPa</p>
                            <p><strong>Wilgotność:</strong> ${forecast.main.humidity}%</p>
                            <p><strong>Prędkość wiatru:</strong> ${forecast.wind.speed} m/s</p>
                            <p><strong>Opis:</strong> ${forecast.weather[0].description}</p>
                            <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">`;

                forecastContainer.appendChild(forecastCard);
            });
        })
        .catch(error => console.error('Error:', error));
});