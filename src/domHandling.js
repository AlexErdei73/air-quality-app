import { lat, lon, weather, pm2_5 } from "./index";

const latitudeDiv = document.querySelector(".latitude");
const longitudeDiv = document.querySelector(".longitude");
const weatherDiv = document.querySelector("div.weather");
const pm2_5Div = document.querySelector(".pm2_5");

export function render() {
  latitudeDiv.textContent = `latitude: ${lat}`;
  longitudeDiv.textContent = `longitude: ${lon}`;
  weatherDiv.textContent = `weather condition: ${weather}`;
  pm2_5Div.textContent = `pm2.5 particulate concentration: ${pm2_5}`;
}
