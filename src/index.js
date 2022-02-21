import "./styles.css";
import { render } from "./domHandling";

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
  type: {
    weather: "weather",
    pollution: "pollution",
  },
  baseURLs: {
    weather: "https://api.openweathermap.org/data/2.5/weather?lat=",
    pollution: "https://api.openweathermap.org/data/2.5/air_pollution?lat=",
  },
  API_KEY: "0fb9ebda5842e2a12a43af55c70d2e3f",
};

function getCoordinates () {
  const result = new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => { 
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coordinates); },
      error => { reject (error); });
  });
  return result;
}

function getData(url, key, query) {
  return getCoordinates()
  .then((coord) => {
    if(query === "weather"){
      const weatherURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
      return fetch(weatherURL, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((e) => console.error(e.message, e.code));
    }
    else if (query === "pollution") {
      const pollutionURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
      return fetch(pollutionURL, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((e) => console.error(e.message, e.code));
    }
  })
  .catch((e) => console.error(e.message, e.code));
}

getData(apiQuery.baseURLs.weather, apiQuery.API_KEY, apiQuery.type.weather)
  .then((data) => {
    const weatherData = userData;
    weatherData.coordinates.latitude = data.coord.lat;
    weatherData.coordinates.longitude = data.coord.lon;
    weatherData.countryCode = data.sys.country;
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    weatherData.countryName = regionNames.of(data.sys.country);
    weatherData.city = data.name;
    weatherData.weather = data.weather[0].description;
    weatherData.tempC = Math.round(data.main.temp - 273.15);
    weatherData.tempF = Math.round((9 / 5) * weatherData.tempC + 32);
    return weatherData;
  })
  .then((data) => {
    return getData(apiQuery.baseURLs.pollution, apiQuery.API_KEY, apiQuery.type.weather)
    .then((pollutionData) => {
      data.pm2_5 = pollutionData.list[0].components.pm2_5;
      return data;
    })
    .catch((e) => console.error(e.message, e.code));
  })
  .then((finalData) => {
    render(finalData);
  })
  .catch((e) => console.error(e.message, e.code));
  