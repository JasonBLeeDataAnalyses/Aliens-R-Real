/* querySelector references */
// table body & input fields
var $tbody = document.querySelector("tbody");
var $timeInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
// button & pagination
var $nextPageBtn = document.querySelector("#pagination");

var startingIndex = 0;
var resultsPerPage = 50;

/* searchBtn eventListener */
$searchBtn.addEventListener("click", searchBtnClick);

/* initalize filteredAddresses to addressData */
var filteredDataSet = dataSet;

/* renderTable function to render dataSet to tbody */
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredDataSet.length; i++) {

    //render current objects and fields
    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    // append new row to tbody & set index to i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

     // create a new cell per field in the table object, set innertext to current value of field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function searchBtnClick() {

  //clean user textInput (no whitespace, all lowercase)
  var filterDateTime = $timeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // set filteredDataSet to array where fields match filter
  filteredDataSet = dataSet.filter(function(data) {
    var dateTimeField = data.datetime.toLowerCase();
    var cityField = data.city.toLowerCase();
    var stateField = data.state.toLowerCase();
    var countryField = data.country.toLowerCase();
    var shapeField = data.shape.toLowerCase();

    var allFields = 
      (filterDateTime === "" || dateTimeField === filterDateTime) &&
      (filterCity === "" || cityField === filterCity) &&
      (filterCountry === "" || countryField === filterCountry) &&
      (filterState === "" || stateField === filterState) &&
      (filterShape === "" || shapeField === filterShape);
    return allFields;

  });
  renderTable();
}

$nextPageBtn.addEventListener("click", nextPageClick);

function nextPageClick() {
  startingIndex += resultsPerPage;
  renderTable();

  if (startingIndex + resultsPerPage >= filteredDataSet.length) {
    $nextPageBtn.classList.add("disabled");
    $nextPageBtn.innerText = "All Data Loaded";
    $nextPageBtn.removeEventListener("click", nextPageClick);
  }
}

/* Renders the table for the first time */
renderTable();