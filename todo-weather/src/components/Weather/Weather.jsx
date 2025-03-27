import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weatherSlice";
import { FaSearch, FaThermometerEmpty } from "react-icons/fa";
import { FaWind, FaDroplet } from "react-icons/fa6";
import sun from "../../assets/sun.gif";
import cloudy from "../../assets/clody.gif";
import rain from "../../assets/rain-unscreen.gif";
import thunder from "../../assets/thunder-unscreen.gif";
import moon from "../../assets/moon-stars.gif";
import snow from "../../assets/snow-unscreen.gif";
import mooncl from "../../assets/moon-cloud.png";
import styles from "./Weather.module.css";

const Weather = ({ setWeatherColor }) => {
  const dispatch = useDispatch();
  const { city, weather, temperature, windSpeed, humidity, error, isNight, localTime } = useSelector(
    (state) => state.weather
  );

  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    dispatch(fetchWeather("Kolkata")); //Default city on load
  }, [dispatch]);

  const getWeatherImage = () => {
    const lowerWeather = weather?.toLowerCase() || "";
    if (lowerWeather.includes("rain")) return rain;
    if (lowerWeather.includes("thunder")) return thunder;
    if (lowerWeather.includes("snow")) return snow;
    if (lowerWeather.includes("cloud") || lowerWeather.includes("mist") || lowerWeather.includes("fog"))
      return isNight ? mooncl : cloudy;
    if (lowerWeather.includes("clear")) return isNight ? moon : sun;
    return sun;
  };

  const getBackgroundColor = () => {
    const lowerWeather = weather?.toLowerCase() || "";
    if (lowerWeather.includes("cloud") || lowerWeather.includes("mist") || lowerWeather.includes("fog")) return "#A4A4A4";
    if (lowerWeather.includes("rain")) return "#4A90E2";
    if (lowerWeather.includes("thunder")) return "#30336b";
    if (lowerWeather.includes("snow")) return "#D6EAF8";
    if (lowerWeather.includes("clear")) return isNight ? "#1E272E" : "#DE8800";
    return "#DE8800";
  };

  useEffect(() => {
    setWeatherColor(getBackgroundColor());
  }, [weather, isNight]); //Update background when weather changes

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      dispatch(fetchWeather(searchCity));
      setSearchCity("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherSearch}>
        <input
          type="text"
          placeholder="Search city..."
          className={styles.searchInput}
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <h2>{city}</h2>
      <p className={styles.time}>{localTime}</p> 
      {error && <p className={styles.error}>Error: {error}</p>}

      <img src={getWeatherImage()} alt="Weather" className={styles.weatherImg} />

      <div className={styles.weatherInfo}>
        <div className={styles.leftSide}>
          <p><FaThermometerEmpty /> {temperature}°C</p>
          <p>{weather}</p>
        </div>
        <div className={styles.rightSide}>
          <p><FaWind /> {windSpeed}</p>
          <p><FaDroplet /> {humidity}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;