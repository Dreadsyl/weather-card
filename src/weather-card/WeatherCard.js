import React, { useState, useEffect } from "react";

import WeatherInfo from "./weather-components/WeatherInfo";
import WeatherFlip from "./weather-components/WeatherFlip";

// API
const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const base = process.env.REACT_APP_OPEN_WEATHER_BASE_URL;

function WeatherCard() {
  const [lat, setLat] = useState(35.6895);
  const [lon, setLon] = useState(139.6917);
  const [unit, setUnit] = useState("metric");
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // GET USER LOCATION
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      // GET DATA FROM API
      await fetch(`${base}lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`)
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    };
    fetchData();
  }, [lat, lon, unit]);

  // TOGGLE BETWEEN IMPERIAL AND METRIC
  function toggleValue(value) {
    if (value === "imperial") {
      setUnit("metric");
      document.getElementById("toggle-unit").firstChild.style.cssText =
        "background-color:#636363;color:#fff";
      document.getElementById("toggle-unit").lastChild.style.cssText =
        "background-color:#fff;color:#636363";
    } else {
      setUnit("imperial");
      document.getElementById("toggle-unit").firstChild.style.cssText =
        "background-color:#fff;color:#636363";
      document.getElementById("toggle-unit").lastChild.style.cssText =
        "background-color:#636363;color:#fff";
    }
  }

  // FLIP TO MORE INFO
  function flipCard() {
    document.getElementById("weather-card").style.cssText =
      "transform: rotateY(180deg)";
  }

  return typeof weatherData.main != "undefined" ? (
    <div id="weather-card">
      <WeatherInfo
        weatherData={weatherData}
        unit={unit}
        switchUnit={toggleValue}
      />
      <WeatherFlip weatherData={weatherData} unit={unit} flipCard={flipCard} />
    </div>
  ) : (
    <div>LOADING...</div>
  );
}

export default WeatherCard;
