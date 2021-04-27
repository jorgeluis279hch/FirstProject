
const btnSearch = document.querySelector('#btn__search');
const formCloser = document.querySelector('.form__closer');
const sideMenu = document.querySelector('.side-form');
// const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function hiddeElement() {
  sideMenu.classList.toggle('menu__side-hidden');
}

btnSearch.addEventListener('click', hiddeElement);
formCloser.addEventListener('click', hiddeElement);

// function getPosition(options) {
//   return new Promise((resolve, reject) => {
//     if (!"geolocation" in navigator) {
//       reject('error navegador no compatible');
//     }
//     navigator.geolocation.getCurrentPosition(resolve, reject, options);
//   })
// }

// let option = {
//   enableHighAccuracy: true, 
//   maximumAge: 0, 
//   timeout: 10000 
// }

// async function locationForIP(){
//   try {
//     const res = await fetch('https://extreme-ip-lookup.com/json/');
//     const json = await res.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//     return -1;
//   }
// }

// async function getLocation() {
//   let result;
//   result = await getPosition();
//   if (!typeof result !== 'object' && typeof result === 'string') {
//     result = await locationForIP();
//     return {
//       type : 'ip',
//       country: result.country, 
//       city: result.city
//     };

//   }
  
//   return {
//     type : 'coords',
//     latitud: result.coords.latitude, 
//     longitud: result.coords.longitude
//   };

// }

// const getLocationDevice = async () =>  {  
//   try {
//     const API_KEY = "0237bbf40ed5274eeb64064949484512";
    
//     const map = await getLocation();

//     let url = (map.type === 'ip') 
//       ? `${API_URL}?q=${map.city}&appid=${API_KEY}`
//       : `${API_URL}?lat=${map.latitud}&lon=${map.longitud}&appid=${API_KEY}`;
    
//     fetch(url)
//       .then(res => res.json())
//       .then(res => console.log(res))
//       .catch(err => console.log('error'));

//   } catch (err) {
//     console.log(err);
//   }
// }

// getLocationDevice();

result = {
  "coord": {
      "lon": -71.5539,
      "lat": -16.3137
  },
  "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
  ],
  "base": "stations",
  "main": {
      "temp": 293.15,
      "feels_like": 291.75,
      "temp_min": 293.15,
      "temp_max": 293.15,
      "pressure": 1026,
      "humidity": 21
  },
  "visibility": 10000,
  "wind": {
      "speed": 4.63,
      "deg": 240
  },
  "clouds": {
      "all": 0
  },
  "dt": 1619456842,
  "sys": {
      "type": 1,
      "id": 8696,
      "country": "PE",
      "sunrise": 1619434593,
      "sunset": 1619476265
  },
  "timezone": -18000,
  "id": 3949222,
  "name": "Los Blancos",
  "cod": 200
}

// La temperatura T en grados Celsius (° C) 
// es igual a la temperatura T en Kelvin (K) menos 273.15:
// T (° C) = T (K) - 273.15
function insertTemp(){
  temperaturaCelcius = Math.round(result.main.temp - 273.15, 2);
  // La temperatura T en grados Fahrenheit (° F) es igual a la temperatura 
  // T en Kelvin (K) multiplicado por 9/5, menos 459,67:
  // T (° F) = T (K) × 9/5 - 459,67
  temperaturaFarenheit =  Math.round((result.main.temp * 9/5 - 459,67), 2);
  
  const temperaturaActual = document.querySelector('.temp__selected');
  const setTemperatura = document.querySelector('#temperatura');
  
  let temp = temperaturaActual.id;
  setTemperatura.textContent = (temp == 'celcious') 
  ? temperaturaCelcius + "°c"
  : temperaturaFarenheit + "°f";
  
}

function insertDateLocation(){
  let tempTitle = document.querySelector('.state__text'); 
  let dateLocation = document.querySelector('.date__system'); 
  let locationTitle = document.querySelector('#locate'); 
  
  // date
  let date = new Date();
  let [day, moth, now] = date.toDateString().split(' ');
  
  tempTitle.textContent = result.weather[0].description;
  dateLocation.textContent = ` ${day} ${now} ${moth}` ;
  locationTitle.textContent = ` ${result.name} - ${result.sys.country}`
}

function insertInfoBoxes() {
  document.querySelector('.box__wind').textContent = result.wind.speed;
  document.querySelector('.box__visibility').textContent = result.visibility;
  document.querySelector('.box__humedad').textContent = result.main.humidity;
  document.querySelector('.box__preasure').textContent = result.main.pressure;
}

function tempSelect(event){
  document.querySelector(event.target.id == 'celcious' ? '#kelvin' : '#celcious').classList.remove('temp__selected');
  event.target.className = 'temp__selected';
  insertTemp();
}

const temps = document.querySelectorAll('.main__temp > div > b');
temps[0].addEventListener('click', tempSelect);
temps[1].addEventListener('click', tempSelect);


insertTemp();
insertDateLocation();








