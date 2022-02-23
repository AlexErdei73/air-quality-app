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

  let class_;
  switch (true) {
    case pm2_5 <= 12:
      class_ = "l-250";
      break;
    case pm2_5 > 12 && pm2_5 <= 35:
      class_ = "l-200";
      break;
    case pm2_5 > 35 && pm2_5 <= 55:
      class_ = "l-170";
      break;
    case pm2_5 > 55 && pm2_5 <= 150:
      class_ = "l-90";
      break;
    case pm2_5 > 150 && pm2_5 <= 250:
      class_ = "l-50";
      break;
  }
  //Wait with animating the cover-bar until the main animation over
  setTimeout(() => {
    if (class_) coverDiv.classList.add(class_);
  }, 1000);
}
