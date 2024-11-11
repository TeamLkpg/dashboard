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

var selectionLocations = ["Hamilton"]; //array of cities selected
var selectionTime = [lowerSlider.value, upperSlider.value]; //min to map
var selection = [];

var datasets = [];

const response2 = fetch("temperature.csv")
  .then((response2) => response2.text())
  .then((response2) => papaParseJsonMap(response2))
  .then((response2) => setDataset())
  .then((response2) => createChart2(datasets[0]));


function papaParseJsonMap(tmpCsvData) {
  Papa.parse(tmpCsvData, {
    header: true,
    complete: function (results) {
      for (let i = 0; i < results.data.length; i++) {
        cityArray.forEach((city) => {
          if (results.data[i].City === city) {
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
  for (let i = 0; i < cityArray.length; i++) {
    if (cityArray[i] == selectionLocations) {
      let temp = new Map();
      console.log(dataArray[i].size);
      for (let [key, value] of dataArray[i]) {
        let year=parseInt(key[0]+key[1]+key[2]+key[3]);
        console.log(year);
        if (year >= selectionTime[0] && year <= selectionTime[1]) {
          temp.set(key, value);
        }
      }
      datasets.push(temp);
    }
  }
}

function createChart2(input) {
  const labels = Array.from(input.keys());
  const data = Array.from(input.values());

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Hamilton",
          data: data,
          backgroundColor: "#00fff0",
          borderWidth: 3,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//Script for checkboxes
//For now it's only New Zealand, is it possible to make it dynamic?
/*
const NZcheckbox = document.getElementById("New Zealand");

const NZTowncheckboxes = [
  document.getElementById("Auckland"),
  document.getElementById("Hamilton"),
];

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
*/
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

/*
const countryArray = ["New Zealand", "New Zealand"];
const cityArray = ["Hamilton", "Auckland"];
const dataArray = [hamiltonData, aucklandData];
*/

function updateYearSpan() {
  const startValue = startTimeInput.value || "1870";
  const endValue = endTimeInput.value || "2000";

  if (1850 <= startValue && startValue <= 2020) {
    displayLowTimeValue.textContent = startValue;
    lowerSlider.value = startValue;
  }
  if (1850 <= endValue && endValue <= 2020) {
    displayHighTimeValue.textContent = endValue;
    upperSlider.value = endValue;
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
  }
}

startTimeInput.addEventListener("input", updateYearSpan);
endTimeInput.addEventListener("input", updateYearSpan);
lowerSlider.addEventListener("input", updateSliderValues);
upperSlider.addEventListener("input", updateSliderValues);
