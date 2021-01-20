import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { getCoordinates, getWeatherIcons } from "./config/config";
import ShowForecast from "./componenets/ShowForecast/ShowForecast";
import HourlyGraph from "./componenets/HourlyGraph/HourlyGraph";
import SunriseGraph from "./componenets/Sunrise/SunriseGraph";
import Searchbar from "./componenets/Searchbar/Searchbar";

require("dotenv").config();

const APIKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coord, setCoord] = useState({ lat: null, long: null });
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [selectedDay, setSelectedDay] = useState({});

  useEffect(() => {
    getCoordinates(setCoord);
  }, []);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.long}&units=metric&appid=${APIKey}`
        )
        .then((res) => {
          setHourly(res.data.hourly);
          setDaily(res.data.daily);
          setSelectedDay(res.data.daily[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    fetchData();
  }, [coord]);
  return (
    <div className="App">
      {isLoading ? (
        <div className="spin-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          {selectedDay.dt && (
            <>
              <Searchbar setCoord={setCoord} />
              <div className="daily-forecast">
                <ShowForecast
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  dailyData={daily}
                />
              </div>
              <div className="graph-container">
                <div className="hourly-graph">
                  <div className="show-temperature">
                    <h1>{Math.round(selectedDay.temp.max)}°</h1>
                    <div>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={getWeatherIcons(selectedDay.weather[0].main)}
                        alt="Weather"
                      />
                    </div>
                  </div>
                  <HourlyGraph selectedDay={selectedDay} hourly={hourly} />
                </div>
                <div className="sunrise">
                  <div className="presssure-humidity-stats">
                    <div className="pressure-stats">
                      <h3>Pressure</h3>
                      <h6>{selectedDay.pressure} hpa</h6>
                    </div>
                    <div className="humidity-stats">
                      <h3>Humidity</h3>
                      <h6>{selectedDay.humidity} %</h6>
                    </div>
                  </div>
                  <SunriseGraph selectedDay={selectedDay} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
