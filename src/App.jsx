import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "./context/themeProvider";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMetric, setIsMetric] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const { toggleTheme, darkMode } = useTheme();

  const fetchWeatherData = async () => {
    if (city) {
      try {
        setLoading(true);
        setError(null);

        const tempUnit = isMetric ? "metric" : "imperial";

        console.log("tuuuuuu", tempUnit);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${tempUnit}`
        );

        setWeatherData(response.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${tempUnit}`
        );

        const dailyForecast = forecastResponse.data.list.filter(
          (_, index) => index % 8 === 0
        );

        setForecast(dailyForecast);
        console.log("dlfrcst", dailyForecast);
      } catch (error) {
        setError("Sorry, we couldn’t retrieve the weather data at this time");
        setWeatherData(null);
        setForecast([]);

        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [isMetric]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const handleTempUnitChange = () => {
    setIsMetric((isMetric) => !isMetric);
  };

  if (loading)
    return (
      <div className=" loading">
        <i className="fa-solid fa-spinner "></i>
      </div>
    );

  return (
    <div className="container">
      <div className="theme-toggle">
        {darkMode ? (
          <i className="fa-solid fa-sun fa-2xl" onClick={toggleTheme}></i>
        ) : (
          <i className="fa-solid fa-moon fa-2xl" onClick={toggleTheme}></i>
        )}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={String(city).charAt(0).toUpperCase() + String(city).slice(1)}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {weatherData && weatherData.main && weatherData.weather && (
        <>
          <div className="header">
            <h1 className="city">{weatherData.name}</h1>
            <div
              className="temperatureContainer"
              onClick={handleTempUnitChange}
            >
              <p className="temperature">{Math.round(weatherData.main.temp)}</p>
              {isMetric ? (
                <p className="temperatureUnit">
                  °C <span>|</span> °F
                </p>
              ) : (
                <p className="temperatureUnit">
                  °F <span>|</span> °C
                </p>
              )}
            </div>
            <div className="condition-container">
              <p className="condition">{weatherData.weather[0].main}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].main.description}
              />
            </div>
          </div>
          <div className="weather-details">
            <div>
              <p>Humidity</p>
              <p className="weather-details-value">
                {Math.round(weatherData.main.humidity)}%
              </p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p className="weather-details-value">
                {Math.round(weatherData.wind.speed)} {isMetric ? "kph" : "mph"}
              </p>
            </div>
          </div>
        </>
      )}

      {forecast.length > 0 && (
        <>
          <div className="forecast">
            <h2 className="forecast-header">5 Day Forecast</h2>
            <div className="forecast-days">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                  />
                  <p>
                    {Math.round(day.main.temp)}
                    {isMetric ? "°C" : "°F"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
