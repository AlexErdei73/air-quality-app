import "./styles.css";

const helloElement = document.querySelector(".hello");

helloElement.textContent = "Hello Webpack";

//START BEN'S CODE
//create global variables to store the user's coordinates and pollution and weather data at their location
let lat;
let lon;
//note: the weather variable needs to be a string as the value it will receive will be a string, not a number like the others
let weather = "";
let pm2_5;

//prompts the window to ask for permission to share location details
if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude.toString();
    lon = position.coords.longitude.toString();

    //if both of the coordinates have been found, log them
    if (lat != undefined && lon != undefined) {
        console.log("Your latitude: " + lat + "\nYour longitude: " + lon);
        //get the weather data from the openweather API
        getAPIData("weather");
        //get the pollution data from the openweather API
        getAPIData("pollution");

    }
    //if one or both of the coordinates have not been found, show an error
    else {
        console.log("Error: unable to get user coordinates");
    }
})};


async function getAPIData (request) {
    //do an API request to get data about weather at the user's location
    if (request == "weather") {
      
      let weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=0fb9ebda5842e2a12a43af55c70d2e3f";
      
      //get the current weather JSON from the API
      let weatherJSON = await fetchJSON(weatherURL);
            
      //set the weather reading to be what was found for the user's coordinates
      weather = weatherJSON.weather[0].description;
      
      //if the weather data was found, log it
      if (weather != undefined) {
        console.log("The current weather description for your location is " + weather + ".");
      }
      //if the weather data was not found, show an error
      else {
        console.log("Error: unable to get weather data for the user");
      }
    }
    //do an API request to get data about pollution at the user's location
    else if (request = "pollution") {
      
      let pollutionURL = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=0fb9ebda5842e2a12a43af55c70d2e3f";
      
      //get the current pollution JSON from the API
      let pollutionJSON = await fetchJSON(pollutionURL);
      
      //set the pm2.5 reading to be what was found for the user's coordinates
      pm2_5 = pollutionJSON.list[0].components.pm2_5;
        
      //if the pm2.5 data was found, log it
      if (pm2_5 != undefined) {
        console.log("The current pm2.5 reading for your location is " + pm2_5 + " μg/m3.");
      }
      //if the pm2.5 data was not found, show an error
      else {
        console.log("Error: unable to get pm2.5 data for the user");
      }
    }
}

//takes in the url with the API constraints and key and returns the JSON that comes back from the API call
function fetchJSON (url) {

    const JSON = fetch(url, {mode: "cors"}).then(function(response) {
        //get the API response in the form of a JSON
        return response.json();
      }).catch(function(err) {
        //log an error if the request failed
        console.log(err);
      });
      return JSON;
}





