import React, { useState } from 'react';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = '7080151f308be709fbbd918fc705885f';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    setWeather(response.data);
  };

  const renderWeatherIcon = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main.toLowerCase();
    let icon = 'CLEAR_DAY';
    if (condition.includes('rain')) {
      icon = 'RAIN';
    } else if (condition.includes('cloud')) {
      icon = 'CLOUDY';
    } else if (condition.includes('snow')) {
      icon = 'SNOW';
    } else if (condition.includes('fog')) {
      icon = 'FOG';
    } else if (weather.main.temp > 30) {
      icon = 'CLEAR_DAY';
    } else {
      icon = 'PARTLY_CLOUDY_DAY';
    }
    return <ReactAnimatedWeather icon={icon} color="goldenrod" size={50} animate={true} />;
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
      />
      <button onClick={getWeather}>Get Report</button>
      {weather && (
        <div className="weather-report">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          {renderWeatherIcon()}
        </div>
      )}
    </div>
  );
};

export default Weather;
