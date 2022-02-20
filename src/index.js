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

const apiQueryData = {
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

function getUserWeather(url, key) {
  return getCoordinates()
  .then((coord) => {
      const weatherURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
    return fetch(weatherURL, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((e) => console.error(e.message, e.code));
    })
  .catch((e) => console.error(e.message, e.code));
}

function getUserPollution(url, key) {
  return getCoordinates()
  .then((coord) => {
  const pollutionURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
  return fetch(pollutionURL, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.error(e.message, e.code));
  })
  .catch((e) => console.error(e.message, e.code));
}

//render(userData); //we render fallback value first

const weather = getUserWeather(apiQueryData.baseURLs.weather, apiQueryData.API_KEY)
  .then((data) => {
    const weatherData = userData;
    weatherData.coordinates.latitude = data.coord.lat;
    weatherData.coordinates.longitude = data.coord.lon;
    console.log(data);
    weatherData.countryCode = data.sys.country;
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    weatherData.countryName = regionNames.of(data.sys.country);
    weatherData.city = data.name;
    weatherData.weather = data.weather[0].description;
    weatherData.tempC = Math.round(data.main.temp - 273.15);
    weatherData.tempF = Math.round((9 / 5) * weatherData.tempC + 32);
    return weatherData;
  })
  .catch((e) => console.error(e.message, e.code));


const pollution = getUserPollution(apiQueryData.baseURLs.pollution, apiQueryData.API_KEY)
  .then((data) => {
    const pm2_5 = data.list[0].components.pm2_5;
    return pm2_5;
  })
  .catch((e) => console.error(e.message, e.code));


Promise.all([weather, pollution]).then((values) => {
  const newData = values[0];
  newData.pm2_5 = values[1];
  render(newData);
});
