const ctx = document.getElementById("chart");


//Timespan Slider values
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const displayLowTimeValue = document.getElementById("display-low-value");
const displayHighTimeValue = document.getElementById("display-high-value");
const lowerSlider = document.getElementById("lower");
const upperSlider = document.getElementById("upper");

/*Testar map*/

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

var selectionLocations = ["Hamilton", "Auckland"]; //array of cities selected
var selectionTime = [parseInt(lowerSlider.value), parseInt(upperSlider.value)]; //min to map
var selection = [];

var datasets = [];
var datasetsCity = [];

const response2 = fetch("temperature.csv")
  .then((response2) => response2.text())
  .then((response2) => papaParseJsonMap(response2))
  .then((response2) => setDataset())
  .then((response2) => createChartForMaps(datasets));


function papaParseJsonMap(tmpCsvData) {
  Papa.parse(tmpCsvData, {
    header: true,
    complete: function (results) {
      for (let i = 0; i < results.data.length; i++) {
        cityArray.forEach((city) => {
          if (results.data[i].City === city) {
            //let AverageTemperatureCelsius = (results.data[i].AverageTemperatureFahr - 32) * 5 / 9;
            dataArray[cityArray.indexOf(city)].set(
              results.data[i].year + "/" + results.data[i].month,
              results.data[i].AverageTemperatureFahr
            );
          }
        });
      }
    },
  });
}

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

let myChart;

/*
function createChart(input) {
  const labels = Array.from(input.keys());
  const data = Array.from(input.values());
   myChart =new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Hamilton",
          data: data,
          backgroundColor: "#00fff0",
          borderColor: "#00fff0",
          borderWidth: 1,
          tension: 0.1,
          pointRadius: null, 
        }
      ],
    },
    options: {
      
      scales: {
        y: {
        },
      },
    },
  });
}*/

const graphColors = [
  "#FF5733", // Red-Orange
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A6", // Pink
  "#FFD700", // Gold
  "#4B0082", // Indigo
  "#FF6347", // Tomato
  "#40E0D0", // Turquoise
  "#FF1493", // Deep Pink
  "#20B2AA", // Light Sea Green
  "#FFD700", // Gold
  "#8A2BE2", // Blue Violet
  "#A52A2A", // Brown
  "#7FFF00", // Chartreuse
  "#D2691E", // Chocolate
  "#6495ED", // Cornflower Blue
  "#FF4500"  // Orange Red
];

function createChartForMaps(input) { //Update this function name
  let i = -1;
  const labels = Array.from(input[0].keys());
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

  console.log(labels);


   myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: data,
    },
    options: {
    },
  });
}



//End script for checkboxes

function toggleShow() {
  const dropdown = document.getElementById("hiddenCalendar");
  const button = event.target;

  dropdown.classList.toggle("show");

  const rect = button.getBoundingClientRect();

  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
}

let labelArray = [];

function createDynamicCheckbox() {
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

createDynamicCheckbox();

function updateYearSpan() {
  const startValue = startTimeInput.value || "1870";
  const endValue = endTimeInput.value || "2000";

  if (1850 <= startValue && startValue <= 2020) {
    displayLowTimeValue.textContent = startValue;
    lowerSlider.value = startValue;
    selectionTime = [lowerSlider.value, upperSlider.value];
  }
  if (1850 <= endValue && endValue <= 2020) {
    displayHighTimeValue.textContent = endValue;
    upperSlider.value = endValue;
    selectionTime = [lowerSlider.value, upperSlider.value];
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
  }
  
  myChart.data.datasets = [];
  myChart.labels = [];
  setDataset();

  // Push each dataset individually into myChart.data.datasets
  datasets.forEach((element, index) => {
    // Create the dataset object for each city
    const dataset = {
      label: datasetsCity[index],  // City name
      data: Array.from(element.values()),  // Convert the Map's values into an array of data points
      backgroundColor: graphColors[index % graphColors.length],  // Cycle through colors
      borderColor: graphColors[index % graphColors.length],  // Same color for border
      borderWidth: 1,
      tension: 0.1,  // Line tension (for smooth curves)
      pointRadius: null,  // Optional: Remove data points
    };
    myChart.data.datasets.push(dataset);
  });
  myChart.data.labels = Array.from(datasets[0].keys());
  console.log(myChart.labels);
  myChart.update();
}

startTimeInput.addEventListener("input", updateYearSpan);
endTimeInput.addEventListener("input", updateYearSpan);
lowerSlider.addEventListener("input", updateSliderValues);
upperSlider.addEventListener("input", updateSliderValues);


//Script for checkboxes

//For now it's only New Zealand, is it possible to make it dynamic?
const NZcheckbox = document.getElementById("New Zealand");

const NZTowncheckboxes = [
  document.getElementById("Auckland"),
  document.getElementById("Hamilton"),
];

function linkCheckboxes(){

}

NZcheckbox.addEventListener("change", function () {
  if (NZcheckbox.checked) {
    NZTowncheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    NZTowncheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});

NZTowncheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (NZTowncheckboxes.every((checkbox) => checkbox.checked)) {
      NZcheckbox.checked = true;
    } else {
      NZcheckbox.checked = false;
    }
  });
});