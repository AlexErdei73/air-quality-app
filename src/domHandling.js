import { nextCity } from "./index";
import { GOOGLE_API_KEY } from "./apiKeys";

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

//code deals with the modal
const modalDivs = document.querySelectorAll(".modal");
const openCityModalBtn = document.querySelector(".openCityModalBtn");
openCityModalBtn.addEventListener("click", openModal);
const transparentDiv = document.querySelector(".transparent");
const form = document.querySelector("form");
form.addEventListener("click", (e) => {
  e.stopPropagation();
  return;
});
const closeBtn = document.querySelector("#close-btn");
const cancelBtn = document.querySelector("#cancel-btn");
transparentDiv.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
form.addEventListener("submit", handleSubmit);


function openModal() {
  modalDivs.forEach((div) => {
    div.classList.add("show");
  })
}

function closeModal() {
  form.style.animation = "linear fadeOutWithRollDown 1s";
  setTimeout(() => {
    modalDivs.forEach((div) => {
      div.classList.remove("show");
    });
    form.style = "";
  }, 1000);
}

function handleSubmit(e) {
  e.preventDefault();
  const city = document.querySelector("#city").value;
  const country = document.querySelector("#country").value;
  const state = document.querySelector("#state").value;  
  const formData = {
    city: city,
    country: country,
    state: state,
  };
  nextCity(formData);
  closeModal();
  form.reset();
}

//code deals with the map
const mapSection = document.querySelector(".map");

function createIframeElement(apiKey, coordinates) {
  const iframeElement = document.createElement("iframe");
  iframeElement.setAttribute("style", "border: 0");
  iframeElement.setAttribute("loading", "lazy");
  iframeElement.setAttribute("allowfullscreen", "true");
  const src = `https://www.google.com/maps/embed/v1/view?zoom=10&center=${coordinates.latitude}, ${coordinates.longitude}&key=${apiKey}`;
  iframeElement.setAttribute("src", src);
  return iframeElement;
}

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

  if (mapSection.firstChild) mapSection.removeChild(mapSection.firstChild);
  mapSection.appendChild(createIframeElement(GOOGLE_API_KEY, coordinates));

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
    coverDiv.classList.remove("l-250", "l-200", "l-170", "l-90", "l-50");
    if (class_) coverDiv.classList.add(class_);
  }, 1000);
}
