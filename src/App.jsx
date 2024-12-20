import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "./components/Loading";
import ThemeToggle from "./components/ThemeToggle";
import Form from "./components/Form";
import WeatherDay from "./components/WeatherDay";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isMetric, setIsMetric] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  function setBgImage() {
    const tempCondition = weatherData?.main?.temp;
    if (!tempCondition) return "default";

    const [low, medium] = isMetric ? [10, 25] : [50, 77];

    if (tempCondition > low && tempCondition < medium) return "medium";
    if (tempCondition >= medium) return "high";
    return "low";
  }

  const fetchWeatherData = async () => {
    if (city) {
      try {
        setLoading(true);
        setError(null);

        const tempUnit = isMetric ? "metric" : "imperial";

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
      } catch (error) {
        setError("Sorry, we couldn’t retrieve the weather data at this time");
        setWeatherData(null);
        setForecast([]);

        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log("wd", weatherData);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMetric]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const handleTempUnitChange = () => {
    setIsMetric((isMetric) => !isMetric);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`bg_image ${setBgImage()}`}>
      <div className="container">
        <ThemeToggle />
        <Form
          city={city}
          setCity={setCity}
          error={error}
          handleSubmit={handleSubmit}
        />
        <WeatherDay
          weatherData={weatherData}
          isMetric={isMetric}
          handleTempUnitChange={handleTempUnitChange}
        />
        <Forecast forecast={forecast} isMetric={isMetric} />
      </div>
    </div>
  );
}

export default App;
