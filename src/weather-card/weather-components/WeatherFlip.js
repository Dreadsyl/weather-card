import "../WeatherCard.style.css";

function WeatherFlip({ weatherData, unit, flipCard }) {
  return (
    <div className="weather-flip" onClick={() => flipCard()}>
      <div className="location-flip">{weatherData.name}</div>
      <div className="icon-flip">
        <img
          src={
            process.env.REACT_APP_OPEN_WEATHER_ICON_URL +
            weatherData.weather[0].icon +
            "@2x.png"
          }
          alt="weather-icon"
        />
        <div className="unit">
          {Math.round(weatherData.main.temp)}
          {unit === "imperial" ? "°F" : "°C"}
        </div>
      </div>
    </div>
  );
}

export default WeatherFlip;
