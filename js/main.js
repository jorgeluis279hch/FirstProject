
const btnSearch = document.querySelector('#btn__search');
const formCloser = document.querySelector('.form__closer');
const sideMenu = document.querySelector('.side-form');
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function hiddeElement() {
  sideMenu.classList.toggle('menu__side-hidden');
}

btnSearch.addEventListener('click', hiddeElement);
formCloser.addEventListener('click', hiddeElement);

function getPosition(options) {
  return new Promise((resolve, reject) => {
    if (!"geolocation" in navigator) {
      reject('error navegador no compatible');
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

let option = {
  enableHighAccuracy: true, 
  maximumAge: 0, 
  timeout: 10000 
}

async function locationForIP(){
  try {
    const res = await fetch('https://extreme-ip-lookup.com/json/');
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

async function getLocation() {
  let locate;
  locate = await getPosition();
  if (!typeof locate !== 'object' && typeof locate === 'string') {
    locate = await locationForIP();
    return {
      type : 'ip',
      country: locate.country, 
      city: locate.city
    };

  }
  
  return {
    type : 'coords',
    latitud: locate.coords.latitude, 
    longitud: locate.coords.longitude
  };

}

const newWeather = async () =>  {  
  try {
    const API_KEY = "0237bbf40ed5274eeb64064949484512";
    
    const map = await getLocation();

    let url = (map.type === 'ip') 
      ? `${API_URL}?q=${map.city}&appid=${API_KEY}`
      : `${API_URL}?lat=${map.latitud}&lon=${map.longitud}&appid=${API_KEY}`;
    
    fetch(url)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('error'));

  } catch (err) {
    console.log(err);
  }
}

queryWeather = newWeather();

// La temperatura T en grados Celsius (° C) 
// es igual a la temperatura T en Kelvin (K) menos 273.15:
// T (° C) = T (K) - 273.15
function insertTemp(){
  temperaturaCelcius = Math.round(queryWeather.main.temp - 273.15, 2);
  // La temperatura T en grados Fahrenheit (° F) es igual a la temperatura 
  // T en Kelvin (K) multiplicado por 9/5, menos 459,67:
  // T (° F) = T (K) × 9/5 - 459,67
  temperaturaFarenheit =  Math.round((queryWeather.main.temp * 9/5 - 459,67), 2);
  
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
  
  tempTitle.textContent = queryWeather.weather[0].description;
  dateLocation.textContent = ` ${day} ${now} ${moth}` ;
  locationTitle.textContent = ` ${queryWeather.name} - ${queryWeather.sys.country}`
}

function insertInfoBoxes() {
  document.querySelector('.box__wind').textContent = queryWeather.wind.speed;
  document.querySelector('.box__visibility').textContent = queryWeather.visibility;
  document.querySelector('.box__humedad').textContent = queryWeather.main.humidity;
  document.querySelector('.box__preasure').textContent = queryWeather.main.pressure;
}

function tempSelect(event){
  document.querySelector(event.target.id == 'celcious' ? '#kelvin' : '#celcious').classList.remove('temp__selected');
  event.target.className = 'temp__selected';
  insertTemp();
}

function* weekDay(list, current = 0) {
  while (true) {
    yield list[current];
    current = (current + 1) % list.length;
  }
}

const realDate = () => {
  const date = new Date();
  let dayNames = [];
  const listDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
  dayNames.length = 4;
  let dayName = weekDay(listDays, (date.getDay() + 2));
  for (let i = 0; i < dayNames.length; i++) {
    // retorna un dia de la senama desde el dia de pasado mañana
    dayNames[i] = dayName.next();
  }
  // retorna una array de objetos con el value que sera 
  return dayNames;
}

function insertDate() {
  let tomorrow = document.querySelectorAll('.week__day'), 
      i = 1; 
      // comienza a partir del 1 porque en html se escribe el dia siguiente como 'mañana'
  
  for (let {value} of realDate()) {
    tomorrow[i].textContent = value;
    i++;
  }
}

async function insertInformation () {

  const temps = await document.querySelectorAll('.main__temp > div > b');
  temps[0].addEventListener('click', tempSelect);
  temps[1].addEventListener('click', tempSelect);
  
  
  await insertDate();
  await insertTemp();
  await insertDateLocation();
  await insertInfoBoxes();
}


insertInformation();