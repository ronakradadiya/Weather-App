import axios from "axios";
import Sun from "../images/Sun.svg";
import Rain from "../images/Rain.svg";
import Cloud from "../images/Cloud.svg";
import Haze from "../images/Haze.svg";
import Fog from "../images/Fog.svg";
import Mist from "../images/Mist.svg";
import Smoke from "../images/Smoke.svg";
import Snow from "../images/Snow.svg";

import { temperature } from "../data/temperature";

const ipLookUp = (setCoord) => {
  axios
    .get("http://ip-api.com/json")
    .then((res) => {
      setCoord({ lat: res.data.lat, long: res.data.lon });
    })
    .catch((error) => {
      setCoord({ lat: 19.0748, long: 72.8856 });
    });
};

export const getCoordinates = (setCoord) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        setCoord({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      function error(error) {
        ipLookUp(setCoord);
      }
    );
  } else ipLookUp(setCoord);
};

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

export const getDayFromTimestamp = (timestamp) => {
  const todaysDate = new Date(timestamp * 1000);
  const today = days[todaysDate.getDay()];
  return today;
};

export const getHourlyData = (selectedDay, hourly) => {
  const todaysDate = new Date(selectedDay.dt * 1000);
  const todaysHourlyData = hourly.filter(
    (data) => new Date(data.dt * 1000).getDate() === todaysDate.getDate()
  );
  const getTimeandTemp = [];
  let currentDate;
  let currentTime;
  let temp = null;
  let hours12;
  let ampm;
  todaysHourlyData.forEach((data) => {
    currentDate = new Date(data.dt * 1000);
    hours12 = (currentDate.getHours() + 24) % 12 || 12;
    ampm = currentDate.getHours() >= 12 ? "pm" : "am";
    currentTime = `${hours12}:${currentDate.getMinutes()}${ampm}`;
    temp = Math.round(data.temp);
    getTimeandTemp.push({
      time: currentTime,
      temperature: temp,
    });
  });
  if (getTimeandTemp.length >= 1) {
    return getTimeandTemp;
  } else {
    return temperature;
  }
};

export const getLocalTime = (timestamp) => {
  const todaysDate = new Date(timestamp * 1000);

  const currentTime = todaysDate.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return currentTime;
};

export const getWeatherIcons = (weather) => {
  switch (weather) {
    case "Clear":
      return Sun;
    case "Clouds":
      return Cloud;
    case "Rain":
      return Rain;
    case "Haze":
      return Haze;
    case "Mist":
      return Mist;
    case "Fog":
      return Fog;
    case "Smoke":
      return Smoke;
    case "Snow":
      return Snow;
    default:
      return null;
  }
};
