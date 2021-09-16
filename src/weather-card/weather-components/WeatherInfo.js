import moment from "moment";
import "../WeatherCard.style.css";

function WeatherInfo({ weatherData, switchUnit, unit }) {
  return (
    <div className="weather-info">
      <div className="logic">
        <span id="toggle-unit" onClick={() => switchUnit(unit)}>
          <span>metric</span>
          <span>imperial</span>
        </span>
      </div>
      <div className="card-body">
        <div className="card-main">
          <div className="location">
            {weatherData.name}, {weatherData.sys.country}
          </div>
          <div className="icon-holder">
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
        <div className="card-info">
          <div className="day">{moment().format("dddd")}</div>
          <div className="date">{moment().format("LL")}</div>
          <div className="info">
            Feels like {Math.round(weatherData.main.feels_like)}
            {unit === "imperial" ? "°F" : "°C"},{" "}
            {weatherData.weather[0].description}
          </div>
          <div className="info">Humidity: {weatherData.main.humidity}%</div>
          <div className="info">Pressure: {weatherData.main.pressure}hPa</div>
          <div className="info">
            Wind: {weatherData.wind.speed}
            {unit === "imperial" ? "mph" : "m/s"}
            &nbsp;&nbsp;
            <div
              style={{
                transform: `rotate(-${weatherData.wind.deg}deg)`,
                display: "inline-block",
              }}
            >
              &rarr;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
