//Chart
const ctx = document.getElementById("chart");
let myChart;

//Timespan Slider values
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const displayLowTimeValue = document.getElementById("display-low-value");
const displayHighTimeValue = document.getElementById("display-high-value");
const lowerSlider = document.getElementById("lower");
const upperSlider = document.getElementById("upper");

//Data for the cities

const hamiltonData = new Map();
const aucklandData = new Map();
const kievData = new Map();
const lvovData = new Map();
const odessaData = new Map();
const brasiliaData = new Map();
const canoasData = new Map();
const capeTownData = new Map();
const johannesburgData = new Map();
const parisData = new Map();
const marseilleData = new Map();
const stockholmData = new Map();
const uppsalaData = new Map();
const tokyoData = new Map();
const tottoriData = new Map();
const warsawData = new Map();
const wroclawData = new Map();

const countryArray = [
  "New Zealand","New Zealand",
  "Ukraine","Ukraine","Ukraine",
  "Brazil","Brazil",
  "South Africa","South Africa",
  "France","France",
  "Sweden","Sweden",
  "Japan","Japan",
  "Poland","Poland",
];

const cityArray = [
  "Hamilton","Auckland",
  "Kiev","Lvov","Odessa",
  "Brasília","Canoas",
  "Cape Town","Johannesburg",
  "Paris","Marseille",
  "Stockholm","Uppsala",
  "Tokyo","Tottori",
  "Warsaw","Wroclaw",
];

const dataArray = [
  hamiltonData, aucklandData,
  kievData, lvovData, odessaData,
  brasiliaData, canoasData,
  capeTownData, johannesburgData,
  parisData, marseilleData,
  stockholmData, uppsalaData,
  tokyoData, tottoriData,
  warsawData, wroclawData,
];

//Selection variables

var selectionLocations = [];
var selectionTime = [parseInt(lowerSlider.value), parseInt(upperSlider.value)];

var datasets = [];
var datasetsCity = [];

const graphColors = [
  "#FF0000",  // Red
  "#0000FF",  // Blue
  "#00FF00",  // Lime
  "#FFFF00",  // Yellow
  "#FF00FF",  // Magenta
  "#00FFFF",  // Cyan
  "#8B0000",  // Dark Red
  "#000080",  // Navy
  "#008000",  // Green
  "#FFD700",  // Gold
  "#800080",  // Purple
  "#FF6347",  // Tomato
  "#FF1493",  // Deep Pink
  "#8A2BE2",  // Blue Violet
  "#D2691E",  // Chocolate
  "#A52A2A",  // Brown
  "#4B0082"   // Indigo
];

//Fetch data from csv

const response2 = fetch("temperature.csv")
  .then((response2) => response2.text())
  .then((response2) => parse(response2))
  .then((response2) => setDataset())
  .then((response2) => createChart(datasets));

  createCheckboxes();
  linkCheckboxes();
  setLocationCheckboxesEventListener();

//Parse the csv data into a maps

function parse(tmpCsvData) {
  Papa.parse(tmpCsvData, {
    header: true,
    complete: function (results) {
      for (let i = 0; i < results.data.length; i++) {
        cityArray.forEach((city) => {
          if (results.data[i].City === city) {
            let AverageTemperatureCelsius = (results.data[i].AverageTemperatureFahr - 32) * 5 / 9;
            dataArray[cityArray.indexOf(city)].set(
              results.data[i].year + "/" + results.data[i].month,
              AverageTemperatureCelsius
            );
          }
        });
      }
    },
  });
}

//Set the dataset for the chart

function setDataset() {
  datasets = [];
  datasetsCity = [];
  
  for (var city of selectionLocations) {
    for (let i = 0; i < cityArray.length; i++) {
      if (cityArray[i] == city) {
        let temp = new Map();
        for (let [key, value] of dataArray[i]) {
          let year = parseInt(key[0] + key[1] + key[2] + key[3]);
          if (year >= selectionTime[0] && year <= selectionTime[1]) {
            temp.set(key, value);
          }
        }
        datasets.push(temp);
        datasetsCity.push(city);
      }
    }
  }
}

//Create the chart

function createChart(input) {
  var labels = [];
  if(selectionLocations.length != 0){
    labels = Array.from(input[0].keys());
  }

  let i = -1;
  var data = input.map((element) => {
    i++;
    return{
      label: datasetsCity[datasets.indexOf(element)],
      data: Array.from(element.values()),
      backgroundColor: graphColors[i],
      borderColor: graphColors[i],
      borderWidth: 1,
      tension: 0.1,
      pointRadius: null,
    }
  });

   myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          title: {
            display: true,
            text: "Temperature",
          },
        },
      },
    },
  });
}

//Update the chart with the new selection

function updateSelection() {
  myChart.data.datasets = [];
  myChart.labels = [];
  setDataset();

  datasets.forEach((element, index) => {
    const dataset = {
      label: datasetsCity[index],
      data: Array.from(element.values()),
      backgroundColor: graphColors[index % graphColors.length],
      borderColor: graphColors[index % graphColors.length],
      borderWidth: 1,
      tension: 0.1,
      pointRadius: null,
    };
    myChart.data.datasets.push(dataset);
  });
  if (selectionLocations.length != 0) {
    myChart.data.labels = Array.from(datasets[0].keys());
  } else {
    myChart.data.labels = [];
  }
  myChart.update();
}

//Script for dropdown in time selection

function toggleShow() {
  const dropdown = document.getElementById("hiddenCalendar");
  const button = event.target;

  dropdown.classList.toggle("show");

  const rect = button.getBoundingClientRect();

  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX }px`;
}

//Create checkboxes

function createCheckboxes() {
  let labelArray = [];
  const locationBox = document.getElementById("checkLocationBox");

  let lastCountry = "start";
  for (let i = 0; i < countryArray.length; i++) {
    let myLabel = document.createElement("label");
    let myCheckbox = document.createElement("input");
    myCheckbox.type = "checkbox";

    let currentCountry = countryArray[i];

    if (currentCountry != lastCountry) {
      let myCountryLabel = document.createElement("label");
      let myCountryCheckbox = document.createElement("input");
      myCountryCheckbox.type = "checkbox";
      myCountryLabel.className = "containerLand";
      myCountryCheckbox.id = currentCountry;
      myCountryCheckbox.value = currentCountry;
      myCountryLabel.appendChild(myCountryCheckbox);
      myCountryLabel.innerHTML += countryArray[i];
      labelArray.push(myCountryLabel);
      lastCountry = currentCountry;
    }
    myLabel.className = "containerStad";
    myCheckbox.id = cityArray[i];
    myCheckbox.value = cityArray[i];

    myLabel.appendChild(myCheckbox);
    myLabel.innerHTML += cityArray[i];
    labelArray.push(myLabel);
  }

  labelArray.forEach((checkbox) => {
    locationBox.appendChild(checkbox);
  });
}

//Linking checkboxes

function linkCheckboxes() {
  const countryCitiesLink = [];

  countryArray.forEach((country, index) => {
    if (!countryCitiesLink[country]) {
      countryCitiesLink[country] = [];
    }
    countryCitiesLink[country].push(cityArray[index]);
  });

  Object.keys(countryCitiesLink).forEach(country => {
    const countryCheckbox = document.getElementById(country);
    const cityCheckboxes = countryCitiesLink[country].map(city => 
      document.getElementById(city)
    );

    countryCheckbox.addEventListener("change", function () {
      cityCheckboxes.forEach(checkbox => {
        checkbox.checked = countryCheckbox.checked;
      });
    });

    cityCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        if (cityCheckboxes.every(city => city.checked)) {
          countryCheckbox.checked = true;
        } else {
          countryCheckbox.checked = false;
        }
      });
    });
  });
}

//Timespan selection

function updateYearSpan() {
  const startValue = startTimeInput.value || "1870";
  const endValue = endTimeInput.value || "2000";

  if (1850 <= startValue && startValue <= 2020) {
    displayLowTimeValue.textContent = startValue;
    lowerSlider.value = startValue;
    selectionTime = [lowerSlider.value, upperSlider.value];
    selectionTime = [parseInt(lowerSlider.value), parseInt(upperSlider.value)];
    updateSelection();
  }
  if (1850 <= endValue && endValue <= 2020) {
    displayHighTimeValue.textContent = endValue;
    upperSlider.value = endValue;
    selectionTime = [lowerSlider.value, upperSlider.value];
    selectionTime = [parseInt(lowerSlider.value), parseInt(upperSlider.value)];
    updateSelection();
  }
}

function updateSliderValues() {
  const startValue = parseInt(lowerSlider.value);
  const endValue = parseInt(upperSlider.value);

  if (startValue <= endValue) {
    displayLowTimeValue.textContent = startValue;
    displayHighTimeValue.textContent = endValue;

    lowerSlider.value = startValue;
    upperSlider.value = endValue;
    selectionTime = [parseInt(lowerSlider.value), parseInt(upperSlider.value)];
    updateSelection();
  }
}

startTimeInput.addEventListener("input", updateYearSpan);
endTimeInput.addEventListener("input", updateYearSpan);
lowerSlider.addEventListener("input", updateSliderValues);
upperSlider.addEventListener("input", updateSliderValues);

//Location selection

function setLocationCheckboxesEventListener() {
  const cityCheckboxes = document.querySelectorAll("#checkLocationBox input");
  
  cityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      setLocationSelection();
      updateSelection();
    }
    );
  });
}

function setLocationSelection() {
  selectionLocations = [];
  const cityCheckboxes = document.querySelectorAll("#checkLocationBox input");
  cityCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectionLocations.push(checkbox.value);
    }
  });
}