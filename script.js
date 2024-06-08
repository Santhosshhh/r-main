const classToggleButtons = document.querySelectorAll(".booking__nav span");

let currentClass = "Economy Class";

classToggleButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentClass = button.textContent;
    classToggleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  var fromInput = document.getElementById("from_location");
  var toInput = document.getElementById("to_location");

  // Populate datalists with location options
  populateDatalist(locations, "from_locations");
  populateDatalist(locations, "to_locations");

  function populateDatalist(options, listId) {
    var datalist = document.getElementById(listId);
    options.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.value = option;
      datalist.appendChild(optionElement);
    });
  }
});
