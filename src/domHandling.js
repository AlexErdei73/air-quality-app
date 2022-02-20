const latitudeDiv = document.querySelector(".latitude");
const longitudeDiv = document.querySelector(".longitude");
const countryCodeDiv = document.querySelector(".country-code");
const countryNameDiv = document.querySelector(".country-name");

const cityDiv = document.querySelector(".city");
const conditionDiv = document.querySelector(".condition");
const tempCelsiusDiv = document.querySelector(".temp-celsius");
const tempFarenheitDiv = document.querySelector(".temp-farenheit");

const pm2_5Div = document.querySelector(".pm2_5");
const coverDiv = document.querySelector(".cover");

export function render(appData) {
  const {
    coordinates,
    countryCode,
    countryName,
    city,
    weather,
    tempF,
    tempC,
    pm2_5,
  } = appData;
  const { latitude, longitude } = coordinates;
  latitudeDiv.textContent = `latitude: ${latitude}`;
  longitudeDiv.textContent = `longitude: ${longitude}`;
  countryCodeDiv.textContent = `country code: ${countryCode}`;
  countryNameDiv.textContent = `country: ${countryName}`;
  cityDiv.textContent = `city: ${city}`;

  conditionDiv.textContent = `condition: ${weather}`;
  tempCelsiusDiv.textContent = `temperature (Celsius): ${tempC}`;
  tempFarenheitDiv.textContent = `temperature (Farenheit): ${tempF}`;

  pm2_5Div.textContent = `pm2.5 particulate concentration: ${pm2_5}`;

  switch(true) {
    case pm2_5 > 12 && pm2_5 <= 35:
      coverDiv.style.width = "200px";
      break;
    case pm2_5 > 35 && pm2_5 <= 55:
      coverDiv.style.width = "170px";
      break;
    case pm2_5 > 55 && pm2_5 <= 150:
      coverDiv.style.width = "90px";
      break;
    case pm2_5 > 150 && pm2_5 <= 250:
      coverDiv.style.width = "50px";
      break;
    case pm2_5 > 250 && pm2_5 <= 500:
      coverDiv.style.width = "0px";
      break;
  }
}







  //const width = 300 - Math.round(pm2_5*1.4);
  //coverDiv.style.width = `${width}px`;
