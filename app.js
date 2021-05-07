"use strict";

const btnGetWeather = document.querySelector(".btn__getweather");

const tableData = document.querySelector(".weather__data");

const city1 = document.querySelector(".city1");
const city2 = document.querySelector(".city2");
const city3 = document.querySelector(".city3");
const city4 = document.querySelector(".city4");

const inputCityName = document.querySelector(".city__name");
const btnSearchCity = document.querySelector(".btn__search");

const noData = document.querySelector(".noData");

const labelCities = [city1, city2, city3, city4];

const cities = ["London", "New York", "Los Angeles", "Las Vegas"];

let index = 0;
let tableEntries = [];

// Button to fetch Weather Data from api
btnGetWeather.addEventListener("click", function (e) {
  e.preventDefault();

  noData.style.display = "none";

  labelCities[index].style.border = "2px solid green";

  // Get Data from API
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cities[index]}`
  );
  request.send();
  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    pushData(data);
  });
});

// Button search to search city
btnSearchCity.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
});

// Function search city
const searchCity = function () {
  const ctName = inputCityName.value;
  tableEntries.forEach(function (item) {
    if (item.city === ctName) {
      const id = tableEntries.findIndex((curRow) => ctName === curRow.city);
      const selectRow = document.querySelectorAll(".cities__data");
      selectRow[id].style.backgroundColor = "yellow";
      setTimeout(function () {
        selectRow[id].style.backgroundColor = "";
      }, 3000);
    }
    inputCityName.value = "";
  });
};

// Function to push the data into array
const pushData = function (data) {
  const { date_and_time, description, pressure_in_hPa, temp_in_celsius } = data;
  const given = new Date(date_and_time);
  const current = new Date();

  const date = (Number(current) - Number(given)) / (1000 * 60 * 60);

  const ent = {
    city: cities[index],
    description: description,
    temp_in_celsius: temp_in_celsius,
    pressure_in_hPa: pressure_in_hPa,
    date_and_time: date.toFixed(),
  };
  tableEntries.push(ent);
  if (index < cities.length - 1) {
    index++;
  } else {
    index = 0;
    btnGetWeather.disabled = true;
  }
  displayData(ent);
};

// Function to Display Data
const displayData = function (data) {
  const {
    city,
    description,
    temp_in_celsius,
    pressure_in_hPa,
    date_and_time,
  } = data;
  const html = `
        <tr class="cities__data">
            <td>${city}</td>
            <td><input type="text" style="padding: 5px ; font-size: 16px; border-radius: 5px" value=${description} /></td>
            <td>${temp_in_celsius}</td>
            <td>${pressure_in_hPa}</td>
            <td>${date_and_time}</td>
            <td><button class="btnDel" onclick="removeRow(this)">delete</button></td>
        </tr>
        `;
  tableData.insertAdjacentHTML("beforeend", html);
};

// Function to delete entry from table
function removeRow(currentRow) {
  while ((currentRow = currentRow.parentElement) && currentRow.tagName != "TR");
  currentRow.parentElement.removeChild(currentRow);
}
