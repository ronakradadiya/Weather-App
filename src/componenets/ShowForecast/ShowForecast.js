import React from "react";
import "./ShowForecast.css";

import { getDayFromTimestamp, getWeatherIcons } from "../../config/config";

const ShowForecast = ({ dailyData, selectedDay, setSelectedDay }) => {
  const handleClick = (data) => {
    setSelectedDay(data);
  };
  const style = {
    border: "4px solid #00A6FA",
    backgroundColor: "#FFF0CD",
  };
  return (
    <>
      {dailyData.map((data) => (
        <div
          onClick={() => handleClick(data)}
          style={data.dt === selectedDay.dt ? style : null}
          className="weather-card"
          key={data.dt}
        >
          <p className="day">{getDayFromTimestamp(data.dt)}</p>
          <div className="temperature">
            <span className="max-temperature">
              {Math.round(data.temp.max)}°
            </span>
            <span>{Math.round(data.temp.min)}°</span>
          </div>
          <div>
            <img
              style={{ width: "50px", height: "50px" }}
              src={getWeatherIcons(data.weather[0].main)}
              alt="Weather"
            />
          </div>
          <div>{data.weather[0].main}</div>
        </div>
      ))}
    </>
  );
};

export default ShowForecast;
