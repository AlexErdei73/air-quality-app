import { lat, lon, weather, pm2_5 } from "./index";

const latitudeDiv = document.querySelector(".latitude");
const longitudeDiv = document.querySelector(".longitude");
const countryCodeDiv = document.querySelector(".country-code");
const countryNameDiv = document.querySelector(".country-name");

const cityDiv = document.querySelector(".city");
const conditionDiv = document.querySelector(".condition");
const tempCelsiusDiv = document.querySelector(".temp-celsius");
const tempFarenheitDiv = document.querySelector(".temp-farenheit");

const pm2_5Div = document.querySelector(".pm2_5");

export function render() {
  latitudeDiv.textContent = `latitude: ${lat}`;
  longitudeDiv.textContent = `longitude: ${lon}`;
  countryCodeDiv.textContent = `country code:`;
  countryNameDiv.textContent = `country:`;
  cityDiv.textContent = `city:`;

  conditionDiv.textContent = `condition: ${weather}`;
  tempCelsiusDiv.textContent = `temperature (Celsius):`;
  tempFarenheitDiv.textContent = `temperature (Farenheit):`;

  pm2_5Div.textContent = `pm2.5 particulate concentration: ${pm2_5}`;
}
