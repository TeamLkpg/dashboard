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


const response = fetch("tmp.csv")
  .then((response) => response.text()) 
  .then((response) => papaParseJson(response))
  .then((response) => {
    createNewData("Ukraine");
    createNewData("New Zealand");
    createChart(datasets);
});



function createNewData(location){
    var datas = [];
    for(let i = 0; i < country.length; i++){
        if(country[i] == location){
            data = avgTempFahr[i];
            /*{
                label: location,
                data: avgTempFahr[i],
                backgroundColor: "#00fff0",
                borderWidth: 3,
                tension: 0.1,
            }*/
            datas.push(data);
        }
    }
    datasets.push(datas);
}



function createChart(input){
      new Chart(ctx, {
      type: "line",
      data: {
        labels: date,
        datasets: [ //Make funktion to create this instead
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


function papaParseJson(tmpCsvData){
    Papa.parse(tmpCsvData, {
        header: true,
        complete: function(results) {
            //console.log("Finished:", results.data); 
            for (let i = 0; i < results.data.length; i++){
                //Kanske kan bli fel eftersom month inte är header
                //recordID.push(results.data[i].record_id)
                month.push(results.data[i].month)
                day.push(results.data[i].day)
                year.push(results.data[i].year)
                date.push(results.data[i].day + "-" + results.data[i].month + "-" + results.data[i].year)
                avgTempFahr.push(results.data[i].AverageTemperatureFahr)
                //avgTempUncFahr.push(results.data[i].AverageTemperatureUncertaintyFahr)
                city.push(results.data[i].City)
                //countryID.push(results.data[i].country_id)
                country.push(results.data[i].Country)
                //latitude.push(results.data[i].Latitude)
                //longitude.push(results.data[i].Longitude)
            }
        }
    });
}


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


let newZealand = new map();
let ukraine = new map();


function papaParseJsonMap(tmpCsvData){
    Papa.parse(tmpCsvData, {
        header: true,
        complete: function(results) {
            //console.log("Finished:", results.data); 
            for (let i = 0; i < results.data.length; i++){
                if(results.data.Country == "Ukraine"){
                    ukraine.set(results.data.year, results.data.AverageTemperatureFahr);
                }
                if(results.data.Country == "New Zealand"){
                    newZealand.set(results.data.year, results.data.AverageTemperatureFahr);
                }

               /* //Kanske kan bli fel eftersom month inte är header
                //recordID.push(results.data[i].record_id)
                month.push(results.data[i].month)
                day.push(results.data[i].day)
                year.push(results.data[i].year)
                date.push(results.data[i].day + "-" + results.data[i].month + "-" + results.data[i].year)
                avgTempFahr.push(results.data[i].AverageTemperatureFahr)
                //avgTempUncFahr.push(results.data[i].AverageTemperatureUncertaintyFahr)
                city.push(results.data[i].City)
                //countryID.push(results.data[i].country_id)
                country.push(results.data[i].Country)
                //latitude.push(results.data[i].Latitude)
                //longitude.push(results.data[i].Longitude)*/
            }
        }
    });
}