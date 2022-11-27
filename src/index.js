// FORECAST DATE
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentFullDate.getDay()];

  let hours = currentFullDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentFullDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return day + " " + hours + ":" + minutes;
}

// CHANGE THE CITY
function getWeather(response) {
  // let forecastCity = document.querySelector("#forecast-city");
  // forecastCity.innerHTML = response.data.name;
  document.querySelector("#forecast-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#forecast-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

// // Feature 3

// // let temperature = degrees.innerHTML;
// // temperature = Number(temperature);
// let celsiusButton = document.querySelector("#celsius-link");
// let fahrenheitButton = document.querySelector("#fahrenheit-link");
// function changeToFahrenheit() {
//   // degrees.innerHTML = Math.round((temperature * 9) / 5 + 32);
//   degrees.innerHTML = "55";
// }
// function changeToCelsius() {
//   degrees.innerHTML = "13";
// }
// fahrenheitButton.addEventListener("click", changeToFahrenheit);
// celsiusButton.addEventListener("click", changeToCelsius);


// LOCATE ME

function searchLocation(geolocation) {
  let latitude = geolocation.coords.latitude;
  let longitude = geolocation.coords.longitude;
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#forecast-date");
let currentFullDate = new Date();
dateElement.innerHTML = formatDate(currentFullDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", showCurrentLocation);

searchCity("Odesa");
