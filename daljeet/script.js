"use strict";

const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const appKey = `&appid=1dc02c2cda3d32eda98eede7405d0e42`;

const searchField = document.querySelector(".search-area input");
const searchBtn = document.querySelector(".search-area button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiURL + appKey + city);
    const data = await response.json();
    
    if (data.cod === "404") {
        alert("City not found. Please try again.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weatherCondition = data.weather[0].main.toLowerCase();
    weatherIcon.src = `img/${weatherCondition}.png`;

    document.querySelector(".weather-display").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    const city = `&q=${searchField.value.trim()}`;
    if (searchField.value.trim() !== "") {
        checkWeather(city);
    }
});

searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const city = `&q=${searchField.value.trim()}`;
        if (searchField.value.trim() !== "") {
            checkWeather(city);
        }
    }
});
