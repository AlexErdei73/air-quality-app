import { OPENWEATHER_API_KEY } from "./apiKeys";

const userData = {
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    countryCode: "",
    countryName: "",
    city: "",
    weather: "",
    tempF: 0,
    tempC: 0,
    pm2_5: 0,
};
  
const apiQuery = {
    baseURLs: {
        weather: "https://api.openweathermap.org/data/2.5/weather?lat=",
        pollution: "https://api.openweathermap.org/data/2.5/air_pollution?lat=",
    },
    API_KEY: OPENWEATHER_API_KEY,
};
  
export function fetchJSON(url) {
    return fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((e) => console.error(e.message, e.code));
}
  
function getWeatherFromJSON(JSON) {
    const weatherData = userData;
    weatherData.coordinates.latitude = JSON.coord.lat;
    weatherData.coordinates.longitude = JSON.coord.lon;
    weatherData.countryCode = JSON.sys.country;
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    weatherData.countryName = regionNames.of(JSON.sys.country);
    weatherData.city = JSON.name;
    weatherData.weather = JSON.weather[0].description;
    weatherData.tempC = Math.round(JSON.main.temp - 273.15);
    weatherData.tempF = Math.round((9 / 5) * weatherData.tempC + 32);
    return weatherData;
}
  
function getPollutionFromJSON(JSON) {
    const pollutionData = JSON.list[0].components.pm2_5;
    return pollutionData;  
}
    
export function getAllData (coord) {
    const weatherURL = apiQuery.baseURLs.weather + coord.latitude + "&lon=" + coord.longitude + "&appid=" + apiQuery.API_KEY;
    const pollutionURL = apiQuery.baseURLs.pollution + coord.latitude + "&lon=" + coord.longitude + "&appid=" +  apiQuery.API_KEY;
  
    const weather = fetchJSON(weatherURL)
      .then((data) => {
        return getWeatherFromJSON(data);
      })
  
    const pollution = fetchJSON(pollutionURL)
      .then((data) => {
        return getPollutionFromJSON(data);
      });
  
    return Promise.all([weather, pollution]).then((newData) => {
      newData[0].pm2_5 = newData[1];
      const finalData = newData[0];
      return finalData;
     })
    .catch((e) => console.error(e.message, e.code));
  }