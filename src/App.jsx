import React, { useEffect, useRef, useState } from "react";
import SearchSection from "./components/SearchSection"
import CurrentWeather from "./CurrentWeather"
import HourlyWeather from "./HourlyWeather"
import weatherCodes from "./components/constants";
import NoResultDiv from "./components/NoResultDiv";

const App = () => {
  const API_KEY=import.meta.env.VITE_API_KEY
  const [currentweather, setcurrentweather] = useState({})
  const [hourlyForecasts, sethourlyForecasts] = useState([])
  const [hasNoResults,setHasNoResults]=useState(false)
  const searchInputRef=useRef(null);
  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime()
      return forecastTime >= currentHour && forecastTime <= next24Hours
    });
    sethourlyForecasts(next24HoursData);
  }

  const getWeatherDetails = async (APIURL) => {
    setHasNoResults(false)
    window.innerWidth <=768 && searchInputRef.current.focus()
    try {
      const response = await fetch(APIURL);
      if(!response.ok) throw new Error();
      const data = await response.json();
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));
      setcurrentweather({ temperature, description, weatherIcon })
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
      searchInputRef.current.value=data.location.name;
      filterHourlyForecast(combinedHourlyData)
    }
    catch  {
      setHasNoResults(true)
  
    }
  };
  useEffect(()=>{
    const defaultCity="London"
      const APIURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(APIURL)

  },[])


  return (
    <div className="cointainer">
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef}></SearchSection>
      {hasNoResults ? (<NoResultDiv></NoResultDiv>):(
         <div className="weather-section">
        <CurrentWeather currentweather={currentweather}></CurrentWeather>
        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecasts.map(hourlyWeather => (
              <HourlyWeather key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}></HourlyWeather>
            ))}
          </ul>
        </div>
      </div>
      )}
     
    </div>
  );
};

export default App;
