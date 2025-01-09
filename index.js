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
function findNearestAndFarthestCity(cityFinder) {
    let minDistance = Infinity;
    let maxDistance = 0;
    let closestCityIndex = -1;
    let farthestCityIndex = -1;

    // Gå igenom alla avstånd
    for (let i = 0; i < distances.length; i++) {
        const distance = distances[i];
        let otherCityIndex = -1;

        // Kontrollera om cityFinder matchar någon av städerna
        if (cityFinder === cities[distance.city1].name) {
            otherCityIndex = distance.city2;
        } else if (cityFinder === cities[distance.city2].name) {
            otherCityIndex = distance.city1;
        }

        // Om staden matchar, kontrollera avståndet
        if (otherCityIndex !== -1) {
            if (distance.distance < minDistance) {
                minDistance = distance.distance;
                closestCityIndex = otherCityIndex;
            }
            if (distance.distance > maxDistance) {
                maxDistance = distance.distance;
                farthestCityIndex = otherCityIndex;
            }
        }
    }

    // Uppdatera informationen för närmaste stad
    if (closestCityIndex !== -1) {
        const cityDivs = document.querySelectorAll(".cityBox");
        cityDivs[closestCityIndex].classList.add("closest");
        const distanceInMil = minDistance / 10;
        cityDivs[closestCityIndex].textContent = `${cities[closestCityIndex].name} ligger ${distanceInMil} mil bort`;
        document.getElementById("closest").textContent = `${cities[closestCityIndex].name}`;
    }

    // Uppdatera informationen för längsta stad
    if (farthestCityIndex !== -1) {
        const cityDivs = document.querySelectorAll(".cityBox");
        cityDivs[farthestCityIndex].classList.add("furthest");
        const distanceInMil = maxDistance / 10;
        cityDivs[farthestCityIndex].textContent = `${cities[farthestCityIndex].name} ligger ${distanceInMil} mil bort`;
        document.getElementById("furthest").textContent = `${cities[farthestCityIndex].name}`;
    }
}

function createDistanceTable() {
    const tableContainer = document.getElementById("table");
    tableContainer.innerHTML = ''; // Rensa tidigare innehåll i tabellen

    const numberOfCities = 39;

    // Skapa den första cellen som är tom (rubrik i övre vänstra hörnet)
    const emptyHeader = document.createElement("div");
    emptyHeader.classList.add("cell", "head_column");
    emptyHeader.textContent = "";
    tableContainer.appendChild(emptyHeader);

    // Skapa rubrikrader för varje stad (i första raden)
    for (let i = 0; i < numberOfCities; i++) {
        const cityHeader = document.createElement("div");
        cityHeader.classList.add("cell", "head_column");
        cityHeader.textContent = i; // Här sätts index för städer (kan ändras till stadens namn om du vill)
        tableContainer.appendChild(cityHeader);
    }

    // Skapa rader för varje stad
    for (let row = 0; row < numberOfCities; row++) {
        const rowHeader = document.createElement("div");
        rowHeader.classList.add("cell", "head_row");
        rowHeader.textContent = `${row}-${cities[row].name}`; // Stadenamn och index
        tableContainer.appendChild(rowHeader);

        // Sätt "even_row" CSS-klassen för varannan rad (för att ge olika bakgrundsfärg om du vill)
        if (row % 2 === 0) {
            rowHeader.classList.add("even_row");
        }

        // Skapa kolumnceller för varje stad
        for (let col = 0; col < numberOfCities; col++) {
            const distanceCell = document.createElement("div");
            distanceCell.classList.add("cell");

            // Sätt "even_row" CSS-klassen för varannan kolumn (för att ge olika bakgrundsfärg om du vill)
            if (col % 2 === 0) {
                distanceCell.classList.add("even_col");
            }
