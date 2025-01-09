// Recommended: All functions declared here
function createCityBoxes(cityName) {
    const cityBoxDiv = document.createElement("div");
    cityBoxDiv.classList.add("cityBox");
    cityBoxDiv.textContent = cityName;
    document.getElementById("cities").append(cityBoxDiv);
}

function displayAllCities() {
    const citiesContainer = document.getElementById("cities");

    for (let i = 0; i < cities.length; i++) {
        createCityBoxes(cities[i].name);
    }
}
displayAllCities();

function findCity() {
    const cityFinder = prompt("Vilken stad söker du?");
    let cityFound = false;

    for (let i = 0; i < cities.length; i++) {
        if (cityFinder === cities[i].name) {
            document.querySelector("h2").textContent = cities[i].name + " (" + cities[i].country + ")";
            document.title = cities[i].name;
            cityFound = true;

            const cityDivs = document.querySelectorAll(".cityBox");
            cityDivs[i].classList.add("target");

            findNearestAndFarthestCity(cityFinder);
            break;
        }
    }

    if (!cityFound) {
        document.querySelector("h2").textContent = cityFinder + " finns inte i databasen.";
        document.title = "Not Found";
    }
}
findCity();
// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

