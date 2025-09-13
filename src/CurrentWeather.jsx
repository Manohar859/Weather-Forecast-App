import React from "react";
const CurrentWeather=({currentweather})=>{
    return(
       <div className="current-weather">
        <img src={`public/icons/${currentweather.weatherIcon}.svg`} className="weather-icon" />
        <h2 className="temperature">{currentweather.temperature}<span>°C</span></h2>
        <p className="description">{currentweather.description}</p>
      </div>
    )
}
export default CurrentWeather