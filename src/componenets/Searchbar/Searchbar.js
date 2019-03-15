import React, { useState, useRef } from "react";
import data from "../../data/cities.json";
import SearchList from "../SearchList/SearchList";
import "./Searchbar.css";

import Location from "../../images/Location.svg";
import Search from "../../images/Search.svg";

const Searchbar = ({ setCoord }) => {
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState([]);

  const searchList = useRef(null);

  const handleChange = (e) => {
    searchList.current.classList.add("show-search-list");
    setInputValue(e.target.value);

    const regex = new RegExp(`^${e.target.value}`, "i");
    const filteredCities = data.filter((city) => regex.test(city.name));

    setCityData(filteredCities);
  };
  return (
    <div className="searchbar">
      <div className="location-icon">
        <img src={Location} alt="Location" />
      </div>
      <input
        onChange={handleChange}
        className="search-input"
        type="text"
        placeholder="Search City"
        value={inputValue}
      />
      <div className="search-icon">
        <img src={Search} alt="Location" />
      </div>
      <div ref={searchList} className="search-list-container">
        {inputValue &&
          cityData.map((city) => (
            <SearchList
              searchList={searchList}
              key={city.id}
              setCoord={setCoord}
              setInputValue={setInputValue}
              cityData={{
                name: city.name,
                state: city.state,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Searchbar;
