# 🌤️ Interactive Weather Report

## 🌐 Overview

The Interactive Weather Report is a dynamic web application that provides real-time current weather conditions and a 5-day forecast for any city worldwide. It is built with HTML, Tailwind CSS, and JavaScript, utilizing the OpenWeatherMap API for weather data and Chart.js for visualizing the forecast.

---

## 📸 Screenshots

![Weather Report](https://i.postimg.cc/J0CTsKWW/Weather-Report-1.png)
![Weather Report](https://i.postimg.cc/Hxg55Nj3/Weather-Report-2.png)
![Weather Report](https://i.postimg.cc/CMJDBm0H/Weather-Report-3.png)

---

## ✨ Features

* **Current Weather Display**: Instantly view a city’s temperature, weather description, humidity, and wind speed.
* **5-Day Forecast**: View daily high and low temperatures for the next five days, displayed in an intuitive bar chart.
* **Temperature Unit Toggle**: Switch effortlessly between Celsius (°C) and Fahrenheit (°F).
* **Dynamic Weather Icons**: Emoji icons visually represent weather conditions.
* **Responsive Design**: The application is optimized for desktops, tablets, and mobile devices.
* **Error Handling**: Provides graceful messaging for invalid inputs or network issues.
* **Loading Indicator**: A visual loader is displayed while fetching weather data.

---

## 🛠️ Technologies Used

* **HTML5**: For the basic structure of the web page.
* **Tailwind CSS**: For rapid, responsive UI styling.
* **JavaScript**: Powers the application's interactivity, API calls, and DOM manipulation.
* **OpenWeatherMap API**: The data source for weather information.
* **Chart.js**: Used to create interactive and visually appealing temperature forecast charts.
* **Custom CSS**: For specialized styling such as the chart container and icon sizing.

---

## ⚙️ Setup and Installation

To get a local copy up and running, follow these simple steps:

1.  **Clone the Repository**
    ```bash
    git clone <repository_url>
    cd interactive-weather-report
    ```

2.  **Get Your OpenWeatherMap API Key**
    * Go to the [OpenWeatherMap website](https://openweathermap.org/).
    * Sign up for a free account.
    * Navigate to the "API keys" section and generate your key.
    
3.  **Configure the API Key**
    Open `script.js` and replace the existing API key with your own:
    ```javascript
    const apiKey = '076875ae1d4a4ccce22be47d39727571'; // Replace with your actual API key
    ```
    *Note: The provided `script.js` already has an API key for demonstration, but it’s best practice to use your own to avoid rate limits*.

4.  **Run the App**
    Simply open the `index.html` file in your web browser.

---

## ⚠️ Important Note on API Key

This project uses the OpenWeatherMap API. A public API key is directly embedded in `script.js` for demonstration purposes. For any production application, it is highly recommended to manage API keys securely on a backend server or using environment variables to prevent exposure.

---

## 📁 Project Structure

.
├── index.html          # Main HTML file
├── script.js           # JavaScript logic and API handling
├── style.css           # Custom styles
└── README.md           # Project documentation


---

## 💡 Future Enhancements

* **Geolocation Support**: Auto-detect user’s location to show local weather.

* **Hourly Forecasts**: Include hourly weather breakdowns.

* **User Preferences**: Persist temperature unit with local storage.

* **Search History**: Save and display recently searched cities.

* **Dark Mode**: Add a theme toggle for night/day viewing.


---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, improve the code, and submit a pull request.

---

## 🙏 Credits

This project was developed by [Anuj Verma](https://github.com/anujverma1103 "GitHub Profile"). If you have any questions or suggestions, feel free to [contact me](https://www.linkedin.com/in/anujverma1103/ "LinkedIn Profile").
OpenWeatherMap API: For providing free and reliable weather data.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.
