import React, { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherIcons } from "../../config/config";
import "./SearchList.css";

require("dotenv").config();

const APIKey = process.env.REACT_APP_API_KEY;

const SearchList = ({ setCoord, setInputValue, cityData, searchList }) => {
  const [coords, setCoords] = useState({});
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [isFound, setIsFound] = useState(false);

  const handleClick = () => {
    searchList.current.classList.remove("show-search-list");
    setCoord({
      lat: coords.lat,
      long: coords.lon,
    });
    setInputValue(`${cityData.name}, ${cityData.state}`);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityData.name}&units=metric&appid=${APIKey}`
        )
        .then((res) => {
          setCoords(res.data.coord);
          setWeather(res.data.weather[0].main);
          setTemperature(res.data.main.temp);
        })
        .catch((error) => {
          setIsFound(true);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isFound ? (
        <div onClick={handleClick} className="search-list">
          <div>
            <span className="city-value">{`${cityData.name}, `}</span>
            <span className="state-value">{cityData.state}</span>
          </div>
          {temperature && (
            <div className="weather-container">
              <div className="temp-value">
                <span className="temperature-value">
                  {Math.round(temperature)}°C
                </span>
                <span className="weather-value">{weather}</span>
              </div>
              <div className="weather-icon">
                <img src={getWeatherIcons(weather)} alt="weather" />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default SearchList;
