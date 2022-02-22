import "./styles.css";
import { render } from "./domHandling";

const userData = {
  coordinates: {
    latitude: 47.497913,
    longitude: 19.040236,
  },
  countryCode: "HUN",
  countryName: "Hungary",
  city: "Budapest",
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

function getData(baseURL, coord, key) {
  const url = baseURL + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
  return fetch(url, { mode: "cors" })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.error(e.message, e.code));
}

render(userData);

getCoordinates()
  .then((coordinates) => {
    getData(apiQuery.baseURLs.weather, coordinates, apiQuery.API_KEY)
      .then((data) => {
        const newData = userData;
        newData.coordinates.latitude = data.coord.lat;
        newData.coordinates.longitude = data.coord.lon;
        newData.countryCode = data.sys.country;
        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        newData.countryName = regionNames.of(data.sys.country);
        newData.city = data.name;
        newData.weather = data.weather[0].description;
        newData.tempC = Math.round(data.main.temp - 273.15);
        newData.tempF = Math.round((9 / 5) * newData.tempC + 32);
        return newData;
      })
      .then((newData) => {
        getData(apiQuery.baseURLs.pollution, coordinates, apiQuery.API_KEY)
        .then((data) => {
          newData.pm2_5 = data.list[0].components.pm2_5;
          render(newData);
        });
      })
      .catch((e) => console.error(e.message, e.code));
    });
