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

const newZealandData = [hamiltonData, aucklandData];


const response2 = fetch("tmp2.csv")
  .then((response2) => response2.text())
  .then((response2) => papaParseJsonMap(response2))
  console.log(hamiltonData)
  .then((response2) => createChart2(hamiltonData));

function papaParseJsonMap(tmpCsvData){
    Papa.parse(tmpCsvData, {
        header: true,
        complete: function(results) {
            //console.log("Finished:", results.data); 
            for (let i = 0; i < results.data.length; i++){
                if(results.data[i].City === "Hamilton"){
                    hamiltonData.set((results.data[i].year +"/"+ results.data[i].month), results.data[i].AverageTemperatureFahr)
                }
                if(results.data[i].City === "Auckland"){
                    aucklandData.set((results.data[i].year +"/"+ results.data[i].month), results.data[i].AverageTemperatureFahr)
                }
            }
        }
    });
}

function createChart2(input) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: "Hamilton",
        datasets: [
          {
            label: input.keys(),
            data: input.values(),
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

//End script for checkboxes
function toggleHiddenCalendar(){
    document.getElementById("hiddenCalendar").classList.toggle("show");
}