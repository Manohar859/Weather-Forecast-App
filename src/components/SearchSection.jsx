import React from "react";
const API_KEY=import.meta.env.VITE_API_KEY
const SearchSection=({getWeatherDetails,searchInputRef})=>{
    const handleCitySearch=(e)=>{
      e.preventDefault();
      const searchInput=e.target.querySelector(".search-input");
     const APIURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
    getWeatherDetails(APIURL)
    };
    const handleLocationSearch=()=>{
      navigator.geolocation.getCurrentPosition(
        position=>{
          const {latitude,longitude}=position.coords;
         const APIURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
    getWeatherDetails(APIURL)
    window.innerWidth >=768 && searchInputRef.current.focus()
        },
        ()=>{
          alert("Location  access  deined . please enable permissions to use this feature");
        }
      )
    }
 return(
    <div className="search-section">
      <form action='#' className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-outlined">
          search
        </span>
        <input type="text" placeholder="Enter a city name" ref={searchInputRef} className="search-input" required />
      </form>
      <button className="location-button" onClick={handleLocationSearch}>
        <span className="material-symbols-outlined">
          my_location
        </span>
      </button>
    </div>
 )
}
export default SearchSection;