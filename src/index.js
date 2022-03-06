import "./styles.css";
import { getAllData } from "./apiService";
import { render } from "./domHandling";

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

