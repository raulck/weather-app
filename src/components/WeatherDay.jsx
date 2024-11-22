function WeatherDay({ weatherData, isMetric, handleTempUnitChange }) {
  return (
    <>
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
    </>
  );
}

export default WeatherDay;
