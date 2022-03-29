import "./styles.css";
import { fetchJSON, getAllData } from "./apiService";
import { render } from "./domHandling";
import { OPENWEATHER_API_KEY } from "./apiKeys";
import { getCodeByCountryName } from "./countryLookup";

const budapestCoord = {
  latitude: 47.497913,
  longitude: 19.040236,
};

function getCoordinates() {
  const result = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coordinates);
      },
      (error) => {
        reject(error);
      }
    );
  });
  return result;
}

export function nextCity (data) {
  const countryCode = getCodeByCountryName(data.country);
  const url = "http://api.openweathermap.org/geo/1.0/direct?q=" + data.city + "," + countryCode + "&limit=1&appid=" + OPENWEATHER_API_KEY;

  fetchJSON(url).then((data) => {
      const coordinates = {
          latitude: data[0].lat,
          longitude: data[0].lon,
      };
      getAllData(coordinates).then((data) => {
          render(data);
      });
  })
  .catch((e) => console.error(e.message, e.code));
}

window.onload = () => {
   getAllData(budapestCoord).then((data) => {
     render(data);
   }).then(async function() {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }).then(() => {
      getCoordinates().then((coord) => {
        getAllData(coord).then((data) => {
          render(data);
        });
      });
   });
};

