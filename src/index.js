import "./index.css";

function toggleLoader(op) {
  const loader = document.querySelector(".overlay");

  if (op) {
    loader.style.display = "flex";
  } else {
    loader.style.display = "none";
  }
}

async function getLocation(location) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`,
    );

    const data = await response.json();

    const { name, country, latitude, longitude } = data.results[0];

    return { name, country, latitude, longitude };
  } catch (error) {
    alert("City or country not found");
    console.error("Error: " + error);
    toggleLoader(false);
  }
}

async function getGeoData(longitude, latitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
    );

    const data = await response.json();

    return {
      temperature: data.current.temperature_2m,
      temperature_unit: data.current_units.temperature_2m,
    };
  } catch (error) {
    alert("City or country not found");
    console.error("Error: " + error);
    toggleLoader(false);
  }
}

async function search(option) {
  toggleLoader(true);

  const { name, country, latitude, longitude } = await getLocation(option);

  const { temperature, temperature_unit } = await getGeoData(
    longitude,
    latitude,
  );

  toggleLoader(false);

  return {
    name,
    country,
    temperature,
    temperature_unit,
  };
}

const searchBar = document.getElementById("search-bar");
const searchBarBtn = document.querySelector(".search-bar-btn");
const location = document.querySelector(".location");
const temperature = document.querySelector(".temperature");

searchBarBtn.addEventListener("click", async () => {
  if (searchBar.value) {
    const searchV = await search(searchBar.value);

    location.textContent = `${searchV.name}, ${searchV.country}`;
    temperature.textContent = `${searchV.temperature} ${searchV.temperature_unit}`;
  }
});

search("León, Nicaragua").then((res) => {
  location.textContent = `${res.name}, ${res.country}`;
  temperature.textContent = `${res.temperature} ${res.temperature_unit}`;
});
