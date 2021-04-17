
let now = new Date ();
let h3 = document.querySelector ("h3");

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

h3.innerHTML = `${day}, ${hour}:${minutes}`;


function searchCity (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector ("#search-form");
form.addEventListener ("submit", searchCity);

function displayWeatherCondition (response) {
document.querySelector("#city").innerHTML= response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
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












