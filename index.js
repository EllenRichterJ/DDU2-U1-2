// Recommended: All functions declared here
function createCityBoxes(cityName) {
    const cityBoxDiv = document.createElement("div");
    cityBoxDiv.classList.add("cityBox");
    cityBoxDiv.textContent = cityName;
    document.getElementById("cities").append(cityBoxDiv);
}

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

