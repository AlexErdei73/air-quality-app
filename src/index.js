import "./styles.css";
import { makeNextCityURL, fetchJSON, getAllData } from "./apiService";
import { render } from "./domHandling";
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

export function nextCity(data) {
  const countryCode = getCodeByCountryName(data.country);
  const url = makeNextCityURL(data.city, countryCode, data.state);

  fetchJSON(url)
    .then((data) => {
      const coordinates = {
        latitude: data[0].lat,
        longitude: data[0].lon,
      };
      return coordinates;
    })
    .then((coordinates) => {
      return getAllData(coordinates);
    })
    .then((data) => {
      render(data);
    })
    .catch((e) => console.error(e.message, e.code));
}

getAllData(budapestCoord)
  .then((data) => {
    render(data);
  })
  .then(async function () {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  })
  .then(() => {
    return getCoordinates();
  })
  .then((coord) => {
    return getAllData(coord);
  })
  .then((data) => {
    render(data);
  })
  .catch((e) => console.error(e.message, e.code));
