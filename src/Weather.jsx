import React, { useState } from "react";
import styles from "./Weather.module.css";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch location suggestions from Nominatim API
  const fetchLocationSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5)); // Show only the top 5 suggestions
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Fetch weather data from WeatherAPI
  const fetchWeather = async () => {
    if (!location) return;
    
    setLoading(true); // Show loading animation
    setError(null);
    setWeather(null);

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
      );

      if (!response.ok) throw new Error("Location not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Hide loading animation
      setSuggestions([]); // Clear suggestions after selection
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weather API Tool</h2>

      <input
        type="text"
        className={styles.input}
        placeholder="Enter location..."
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
          fetchLocationSuggestions(e.target.value);
        }}
      />

      {/* Dropdown for suggestions */}
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              className={styles.suggestionItem}
              onClick={() => {
                setLocation(place.display_name);
                setSuggestions([]); // Clear suggestions on selection
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      <button className={styles.button} onClick={fetchWeather} disabled={loading}>
        {loading ? "Fetching..." : "Get Weather"}
      </button>

      {/* Show loader while fetching */}
      {loading && <div className={styles.loader}></div>}

      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>
            Weather in {weather.location.name}:
          </h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>

          {/* Weather Icon */}
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className={styles.weatherIcon}
          />
        </div>
      )}
    </div>
  );
}
