const ctx = document.getElementById("chart");

//const recordID = [];
const month = [];
const day = [];
const year = [];
const avgTempFahr = [];
//const avgTempUncFahr = [];
const city = [];
//const countryID = [];
const country = [];
//const latitude = [];
//const longitude = [];
const date = [];

var datasets = [];

var selection = [];



//WORKING CODE

/*
const response = fetch("tmp.csv")
  .then((response) => response.text())
  .then((response) => papaParseJson(response))
  .then((response) => {
    createNewData("Ukraine");
    createNewData("New Zealand");
    createChart(datasets);
  });

function createNewData(location) {
  var datas = [];
  for (let i = 0; i < country.length; i++) {
    if (country[i] == location) {
      data = avgTempFahr[i];
      datas.push(data);
    }
  }
  datasets.push(datas);
}

function createChart(input) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        //Make funktion to create this instead
        {
          label: "Ukraine",
          data: input[0],
          backgroundColor: "#00fff0",
          borderWidth: 3,
          tension: 0.1,
        },
        {
          label: "New Zealand",
          data: input[1],
          backgroundColor: "#002351",
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

function papaParseJson(tmpCsvData) {
  Papa.parse(tmpCsvData, {
    header: true,
    complete: function (results) {
      //console.log("Finished:", results.data);
      for (let i = 0; i < results.data.length; i++) {
        //Kanske kan bli fel eftersom month inte är header
        //recordID.push(results.data[i].record_id)
        month.push(results.data[i].month);
        day.push(results.data[i].day);
        year.push(results.data[i].year);
        date.push(
          results.data[i].day +
            "-" +
            results.data[i].month +
            "-" +
            results.data[i].year
        );
        avgTempFahr.push(results.data[i].AverageTemperatureFahr);
        //avgTempUncFahr.push(results.data[i].AverageTemperatureUncertaintyFahr)
        city.push(results.data[i].City);
        //countryID.push(results.data[i].country_id)
        country.push(results.data[i].Country);
        //latitude.push(results.data[i].Latitude)
        //longitude.push(results.data[i].Longitude)
      }
    },
  });
}
*/

//END WORKING CODE

/*
function csvToJson(csvString) {
    const rows = csvString
        .split("\n");

    const headers = rows[0]
        .split(",");

    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {

        const values = rows[i]
            .split(",");

        const obj = {};

        for (let j = 0; j < headers.length; j++) {

            const key = headers[j]
                .trim();
            const value = values[j]
                .trim();

            obj[key] = value;
        }

        jsonData.push(obj);
    }
    return JSON.stringify(jsonData);
}

*/

/*
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            document.getElementById('output').innerText = content;
        };
        reader.readAsText(file);
    }
});
*/

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


const countryArray = ["New Zealand", "New Zealand", 
                      "Ukraine", "Ukraine", "Ukraine", 
                      "Brazil", "Brazil", 
                      "South Africa", "South Africa",
                      "France", "France",
                      "Sweden", "Sweden",
                      "Japan", "Japan",
                      "Poland", "Poland"];

const cityArray =   ["Hamilton", "Auckland", 
                      "Kiev", "Lvov", "Odessa", 
                      "Brasília", "Canoas", 
                      "Cape Town", "Johannesburg",
                      "Paris", "Marseille",
                      "Stockholm", "Uppsala",
                      "Tokyo", "Tottori",
                      "Warsaw", "Wroclaw"];
                    
const dataArray =   [hamiltonData, aucklandData, 
                      kievData, lvovData, odessaData, 
                      brasiliaData, canoasData, 
                      capeTownData, johannesburgData,
                      parisData, marseilleData,
                      stockholmData, uppsalaData,
                      tokyoData, tottoriData,
                      warsawData, wroclawData];



var selectionLocations = [];  //array of cities selected
var selectionTime = [];       //min to max

var datasets = [];            

const response2 = fetch("tmp2.csv")
    .then((response2) => response2.text())
    .then((response2) => papaParseJsonMap(response2))
    .then((response2) => createChart2(hamiltonData));
   

function setDataset(selectionLocations) {
  for (let i = 0; i < cityArray.length; i++) {
    if (city[i] == selectionLocations) {
      datasets.push(dataArray[i]);
    }
  }
  datasets.push(datas);
}

function papaParseJsonMap(tmpCsvData) {
  Papa.parse(tmpCsvData, {
    header: true,
    complete: function (results) {
      //console.log("Finished:", results.data);
      for (let i = 0; i < results.data.length; i++) {
        if (results.data[i].City === "Hamilton") {
          hamiltonData.set(
            results.data[i].year + "/" + results.data[i].month,
            results.data[i].AverageTemperatureFahr
          );
        }
        if (results.data[i].City === "Auckland") {
          aucklandData.set(
            results.data[i].year + "/" + results.data[i].month,
            results.data[i].AverageTemperatureFahr
          );
        }
      }
      console.log(results.data[0].Country);
    },
  });
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
  document.getElementById("hiddenCalendar").classList.toggle("show");
}

let labelArray = [];

function createDynamicCheckbox(){
  const locationBox = document.getElementById('checkLocationBox');
 
  

  let lastCountry = "start";
  for(let i = 0; i < countryArray.length; i++){
    let myLabel = document.createElement('label');
    let myCheckbox = document.createElement('input');
    myCheckbox.type = 'checkbox';

    let currentCountry = countryArray[i];

    if (currentCountry != lastCountry){
      let myCountryLabel = document.createElement('label');
      let myCountryCheckbox = document.createElement('input');
      myCountryCheckbox.type = 'checkbox'
      console.log("")
      console.log(currentCountry + " " + i)
      myCountryLabel.className = 'containerLand';
      myCountryCheckbox.id = currentCountry;
      myCountryCheckbox.value = currentCountry;
      myCountryLabel.appendChild(myCountryCheckbox);
      myCountryLabel.innerHTML += countryArray[i];
      labelArray.push(myCountryLabel);
      lastCountry = currentCountry;

    }
    
    console.log(cityArray[i] + " " + i)
    myLabel.className = 'containerStad';
    myCheckbox.id = cityArray[i];
    myCheckbox.value = cityArray[i];
    
    myLabel.appendChild(myCheckbox);
    myLabel.innerHTML += cityArray[i];
    labelArray.push(myLabel);
    

    
  }
  
  labelArray.forEach((checkbox) =>{
    locationBox.appendChild(checkbox);
  });
}

  
createDynamicCheckbox();

/*
const countryArray = ["New Zealand", "New Zealand"];
const cityArray = ["Hamilton", "Auckland"];
const dataArray = [hamiltonData, aucklandData];
*/

