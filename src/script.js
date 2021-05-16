
let now = new Date ();
let h4 = document.querySelector ("h4");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday", "Sunday"];


let day = days[now.getDay()];
let hour = now.getHours ();
if ( hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes <10) {
  minutes = `0${minutes}`;
}

h4.innerHTML = `${day}, ${hour}:${minutes}`;

function formatDay (timestamp) {
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
  
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");


  let forecastHTML = `<div class="row">`;

  forecast.forEach (function (forecastDay, index) {
  if (index < 6) {

  forecastHTML = 
  forecastHTML + 
  `<div class="col-2">
          <div class= "weather-forecast-day"> ${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
            alt=""
              />
              <div class = "weather-forecast-temp"> 
              <span class = "weather-forecast-temp-max">${Math.round(forecastDay.temp.max)} °C</span>
               | <span class = "weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°C</span>
               </div>
      </div>`;
        }
    });

      forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  
}

function getForecast(coordinates){
console.log(coordinates);
let apiKey = "f9d786d2d20b7dfc09206176024760c1";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function searchCurrentCity(city) {
  let apiKey ="f9d786d2d20b7dfc09206176024760c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCity (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector ("#search-form");
form.addEventListener ("submit", searchCity);

function displayWeatherCondition (response) {
  console.log(response.data);
document.querySelector("#city").innerHTML= response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

celsiusTemperature = response.data.main.temp;

getForecast(response.data.coord);
}

function search (event){
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = "f9d786d2d20b7dfc09206176024760c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let input = document.querySelector("#search-form");
input.addEventListener ("submit", search);

function displayFahrenheitTemperature (event) {
  event.preventDefault ();
  let fahrenheitTemperature = (celsiusTemperature * 9/5 +32);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature (event) {
  event.preventDefault ();
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f9d786d2d20b7dfc09206176024760c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

searchCurrentCity("Leiden");
















