function Forecast({ forecast, isMetric }) {
  return (
    <>
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
    </>
  );
}

export default Forecast;
