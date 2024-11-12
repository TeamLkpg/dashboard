Description of the functions, variables and constants in script.js

functions:

`parse`
This function parses CSV data using Papa.parse. For each row, it checks if city matches an entry in cityArray. If a match is found, it converts the temperature from Fahrenheit to Celsius and saves it in an array.

`setDataset`
Selects the country to display on the chart. It maps time and year into datasets with city as the key.

`createChart`
Creates the graph on the front page.

`updateSelection`
Updates the chart when changes occur on the front page, such as selecting new countries or temperatures.

`toggleShow`
Toggles the hidden flexbox connected to the button in "Timespan."

`createCheckboxes`
Creates a dynamic checkbox field on the site based on the countries provided in the .csv file. It separates the countries and cities into two different arrays.

`linkCheckboxes`
Enables selecting a country checkbox to automatically check all cities associated with that country.

`updateYearSpan`
Updates the chosen year span when a change occurs in the hidden menu window under Timespan.

`updateSliderValues`
Updates the chosen year span when a change occurs in the slider range under Timespan.

`setLocationCheckboxesEventListener`
A function that listens for changes in the checkboxes and calls setLocationSelection and updateSelection to notify these functions that a change has occurred.

`setLocationSelection`
Is called when setLocationCheckboxesEventListener detects a change, updating the selected options.




variables/constants:

ctx                 - The chart area in index.html
myChart             - The charrt

startTimeInput      - start input in the hidden-box, in Timespan
endTimeInput        - end input in the hidden-box, in Timespan
displayLowTimeValue - start display value, in Timespan
displayHighTimeValue- end display value, in Timespan
lowerSlider         - lower slider value, in Timespan
upperSlider         - upper slider value, in Timespan

dataArray           - Array with maps with the data for each city
countryArray        - Arrays with the corresponding country to datarray
cityArray           - Array with the ccorresponding city to dataArray


selectionLocations  - Theurrent selected location valuescurrent selection for location
selectionTime       - The current selected time-span value- The current selection for timespan

datasets            - The datasets corresponding to the current selection 
datasetsCity        - The cities corresponding to the current selection

graphColors          - Array with colours for the chart 


