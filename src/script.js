
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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;

  days.forEach (function (day) {

  forecastHTML = 
  forecastHTML + 
  `<div class="col-2">
          <div class= "weather-forecast-day"> ${day}</div>
          <img
            class="suncloudsmall"
            src="media/sunandcloud.png"
            alt="suncloud"
              />
              <div class = "weather-forecast-temp"> 
              <span class = "weather-forecast-temp-max">18 °C</span>
               | <span class = "weather-forecast-temp-min">12 °C</span>
               </div>
      </div>`;
  });

      forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  
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

displayForecast();












