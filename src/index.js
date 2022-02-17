import "./styles.css";
import { render } from "./domHandling";

const userData = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
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

const newData = userData;
  
function getUserLocation () {
  let coordinates = new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
         newData.coordinates = {"latitude": position.coords.latitude, "longitude": position.coords.longitude};
         resolve(newData.coordinates);
      });
    };
  }).then(result => {
    return result;
  }).catch(e => {console.error(e.message, e.code); 
  });
  return coordinates;
}

function getUserWeather(url, coord, key){
  const weatherURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
    fetch(weatherURL, { mode: "cors" })
    .then(res => res.json())
    .then(data => { 
      newData.weather = data.weather[0].description;
      newData.tempC = Math.round(data.main.temp -273.15);
      newData.tempF = Math.round((9/5 * newData.tempC) + 32);
    }).catch(e => { 
      console.error(e.message, e.code); 
    });
}

function getUserPollution(url, coord, key){
  const pollutionURL = url + coord.latitude + "&lon=" + coord.longitude + "&appid=" + key;
    fetch(pollutionURL, { mode: "cors" })
    .then(res => res.json())
    .then(data => { 
      newData.pm2_5 = data.list[0].components.pm2_5;
    }).catch(e => { 
      console.error(e.message, e.code); 
    });
}

getUserLocation()
  .then((coord) => {
    getUserWeather(apiQueryData.baseURLs.weather, coord, apiQueryData.API_KEY);
    getUserPollution(apiQueryData.baseURLs.pollution, coord, apiQueryData.API_KEY);
  })    
  .then(() => console.log(newData))
  .catch(e => {console.error(e.message, e.code); 
  });
