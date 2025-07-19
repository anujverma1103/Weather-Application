const apiKey = '076875ae1d4a4ccce22be47d39727571'; 

        const searchButton = document.getElementById('search-button');
        const cityInput = document.getElementById('city-input');
        const toggleUnitButton = document.getElementById('toggle-unit-button');
        let isCelsius = true;

        const placeholder = document.getElementById('placeholder');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        const weatherResults = document.getElementById('weather-results');
        const loader = document.getElementById('loader');

        let forecastChart = null;
        let currentCoords = null;

        const getWeatherIcon = (id) => {
            if (id >= 200 && id < 300) return '⛈️'; 
            if (id >= 300 && id < 400) return '🌦️';
            if (id >= 500 && id < 600) return '🌧️';
            if (id >= 600 && id < 700) return '❄️';
            if (id >= 700 && id < 800) return '🌫️';
            if (id === 800) return '☀️';
            if (id > 800) return '☁️';
            return '🌍';
        };
        
        const convertTemp = (temp) => isCelsius ? temp : (temp * 9/5) + 32;
        const formatTemp = (temp) => `${Math.round(convertTemp(temp))}°${isCelsius ? 'C' : 'F'}`;

        const updateCurrentWeatherUI = (data) => {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = formatTemp(data.main.temp);
            document.getElementById('weather-icon').textContent = getWeatherIcon(data.weather[0].id);
            document.getElementById('weather-description').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h

            // Calculate local time using timezone offset
            const localTime = new Date((data.dt + data.timezone) * 1000);
            document.getElementById('current-time').textContent = `Last updated: ${localTime.toLocaleDateString()} ${localTime.toLocaleTimeString()}`;
        };

        const updateForecastChartUI = (data) => {
            const forecastByDay = {};

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toISOString().split("T")[0]; // Get YYYY-MM-DD string

                if (!forecastByDay[day]) {
                    forecastByDay[day] = {
                        temps: [],
                        descriptions: []
                    };
                }
                forecastByDay[day].temps.push(item.main.temp);
                forecastByDay[day].descriptions.push(item.weather[0].description);
            });

            const labels = [];
            const highTemps = [];
            const lowTemps = [];
            const descriptions = []; // To store most frequent description for tooltip

            // Get up to 5 days of forecast, starting from the next full day
            Object.entries(forecastByDay).slice(0, 5).forEach(([day, values]) => {
                const date = new Date(day);
                labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));

                // Calculate high and low temps for the day, converting units
                highTemps.push(Math.max(...values.temps.map(t => convertTemp(t))));
                lowTemps.push(Math.min(...values.temps.map(t => convertTemp(t))));

                // Find the most frequent weather description for the day
                const freq = {};
                values.descriptions.forEach(desc => {
                    freq[desc] = (freq[desc] || 0) + 1;
                });
                const mostFrequent = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
                descriptions.push(mostFrequent);
            });

            const ctx = document.getElementById('forecast-chart').getContext('2d');
            
            if (forecastChart) {
                forecastChart.destroy();
            }

            forecastChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: `High (${isCelsius ? '°C' : '°F'})`,
                            data: highTemps,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: `Low (${isCelsius ? '°C' : '°F'})`,
                            data: lowTemps,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: `Temperature (${isCelsius ? '°C' : '°F'})`
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                footer: function(tooltipItems) {
                                    const index = tooltipItems[0].dataIndex;
                                    return `Condition: ${descriptions[index]}`; 
                                }
                            }
                        },
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        };

        const fetchWeatherData = async (city) => {
            placeholder.classList.add('hidden');
            weatherResults.classList.add('hidden');
            errorMessage.classList.add('hidden');
            loader.classList.remove('hidden');


            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const [currentRes, forecastRes] = await Promise.all([
                    fetch(currentWeatherUrl),
                    fetch(forecastUrl)
                ]);

                if (!currentRes.ok || !forecastRes.ok) {
                    if (currentRes.status === 404) {
                       throw new Error('City not found. Please check the spelling and try again.');
                    }
                    throw new Error('Failed to fetch weather data.');
                }
                
                const currentData = await currentRes.json();
                const forecastData = await forecastRes.json();

                currentCoords = { lat: currentData.coord.lat, lon: currentData.coord.lon };

                updateCurrentWeatherUI(currentData);
                updateForecastChartUI(forecastData);

                loader.classList.add('hidden');
                weatherResults.classList.remove('hidden');

            } catch (error) {
                loader.classList.add('hidden');
                errorText.textContent = error.message;
                errorMessage.classList.remove('hidden');
            }
        };
        // Event listeners for search and unit toggle
        searchButton.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) fetchWeatherData(city);
        });

        cityInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) fetchWeatherData(city);
            }
        });

        toggleUnitButton.addEventListener('click', () => {
            isCelsius = !isCelsius;
            toggleUnitButton.textContent = `Switch to ${isCelsius ? '°F' : '°C'}`;
            const currentCityName = document.getElementById('city-name').textContent;
            if (currentCityName) {
                fetchWeatherData(currentCityName);
            } else {
                errorText.textContent = 'Please search for a city first to toggle units.';
                errorMessage.classList.remove('hidden');
            }
        });
