/* Save Location */
const submitSearch = document.getElementById("submit-search");
const locateMeBtn = document.getElementById("locate-me");
const locSearch = document.getElementById("loc-input");
const locOutput = document.getElementById("loc-name");

submitSearch.onclick = function() {
  let locName = locSearch.value;
  if (locName !== "") {
    storeLoc(locName);
  }
}

locSearch.addEventListener('keydown', runSearch);

function runSearch(e) {
  if (e.code === "Enter") {
    let locName = locSearch.value;
    if (locName === "") {
      return;
    } else {
      storeLoc(locName);
    }
  }
}

locateMeBtn.onclick = function() {
  locOutput.innerHTML = "Locating...";

  const options = {
    enableHighAccuracy: true,
    timeout: 4000,
    maximumAge: 0
  }

  const success = (pos) => {
    const coord = pos.coords;
    latLon = [coord.latitude, coord.longitude];
    storeLoc(latLon);
  }
  
  const error = (err) => {
    locOutput.innerHTML = `Unable to retrieve location. Reason: ${err.message} `;
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

async function storeLoc(locInp) {
  locOutput.innerHTML = "Locating...";
  let urlLoc = "";
  let searchPath = "";
  if (typeof locInp === "object") {
    urlLoc = `/apiLocReverse?lat=${locInp[0]}&lon=${locInp[1]}`;
    searchPath = "reverse";
    console.log(urlLoc);
  } else {
    locInp = locInp.toLowerCase().split(",").map(item => item.trim().replace(" ", "%20")).join(",");
    urlLoc = `/apiLocDirect?q=${locInp}&limit=5`;
    searchPath = "direct";
    console.log(urlLoc);
  }

  let controller = new AbortController();
  const response = await fetch(urlLoc, { signal: controller.signal });
  const myData = await response.json();

  if (myData.length === 0) {
    locOutput.innerHTML = "Unable to find location. Please try again."
    return;
  }

  if (searchPath === "direct") {
    locInp = locInp.replace("%20", " ");

    if (locInp.split(",").length > 1) {
      const likelyLoc = myData.filter(item => item.hasOwnProperty("state") && item.state.toLowerCase() === locInp.split(",")[1]);

      if (likelyLoc.length !== 0) {
        lat = likelyLoc[0].lat;
        lon = likelyLoc[0].lon;
        locOutput.innerHTML = [likelyLoc[0].name, likelyLoc[0].state, likelyLoc[0].country].join(", ");
        getWeather(lat, lon);
      } else {
        lat = myData[0].lat;
        lon = myData[0].lon;
        locOutput.innerHTML = [myData[0].name, myData[0].state, myData[0].country].join(", ");
        getWeather(lat, lon);
      }
    } else {
      lat = myData[0].lat;
      lon = myData[0].lon;
      if (!myData[0].hasOwnProperty("state")) {
        locOutput.innerHTML = [myData[0].name, myData[0].country].join(", ");
      } else {
        locOutput.innerHTML = [myData[0].name, myData[0].state, myData[0].country].join(", ");
      }
      getWeather(lat, lon);
    }
  } else {
    lat = myData[0].lat;
    lon = myData[0].lon;
    if (!myData[0].hasOwnProperty("state")) {
      locOutput.innerHTML = [myData[0].name, myData[0].country].join(", ");
    } else {
      locOutput.innerHTML = [myData[0].name, myData[0].state, myData[0].country].join(", ");
    }
    getWeather(lat, lon);
  }
  controller.abort();
}

/* Website Variables and Containers */
let units = "F"; // default to F
let origTemp = 0;
const imgPath = "../img/";
const imgFiles = {
  "ash": "ash.jpg",
  "clear": "clear.jpg",
  "dust": "dust.jpg",
  "fog": "fog.jpg",
  "overcast": "overcast.jpg",
  "scatterclouds": "scatterclouds.jpg",
  "snow": "snow.jpg",
  "squall": "squall.jpg",
  "thunderstorm": "thunderstorm.jpg",
  "tornado": "tornado.jpg"
}

const weatherCtnr = document.querySelector("#weather-ctnr");

function makeCurrWeatherCtnr() {
  const ctnrClasses = ["ctnr-header", "ctnr-body"];
  const ctnrBodySections = ["ctnr-body-top", "ctnr-body-bottom"];
  const ctnrData = ["weather-temp-curr", "weather-cond", "weather-desc"];
  const celFahr = {0: ["F", "&#8457;"], 1: ["C", "&#8451;"]};

  for (let i = 0; i < ctnrClasses.length; i++) {
    const elem = document.createElement("div");
    weatherCtnr.appendChild(elem).className = ctnrClasses[i];
  }

  document.querySelector(".ctnr-header").innerHTML = "Today";

  const weatherBody = document.querySelector(".ctnr-body");
  for (let j = 0; j < ctnrBodySections.length; j++) {
    const elem = document.createElement("div");
    weatherBody.appendChild(elem).className = ctnrBodySections[j];
  }

  const weatherBodyTop = document.querySelector(".ctnr-body-top");
  for (let k = 0; k < ctnrData.length; k++) {
    const elem = document.createElement("div");
    weatherBodyTop.appendChild(elem).className = ctnrData[k];
  }

  const celFahrBtns = document.createElement("div");
  weatherBodyTop.appendChild(celFahrBtns).className = "celFahr-ctnr";
  for (let l = 0; l < (Object.keys(celFahr)).length; l++) {
    const elem = document.createElement("button");
    celFahrBtns.appendChild(elem).className = `temp-units ${celFahr[l][0]}`;
    celFahrBtns.appendChild(elem).innerHTML = celFahr[l][1];
  }
}

makeCurrWeatherCtnr();

/* Toggle for Temp Units */

document.querySelector(".F").addEventListener("click", function() {
  if (locOutput.innerHTML !== "") {
    if (units === "C") {
      units = "F";
      let temp = document.querySelector(".weather-temp-curr");
      const newTemp = Math.round(origTemp);
      temp.innerHTML = newTemp + `&#8457`;
    } else {
      units = "F";
    }
  }
})

document.querySelector(".C").addEventListener("click", function() {
  if (locOutput.innerHTML !== "") {
    if (units === "F") {
      units = "C";
      let temp = document.querySelector(".weather-temp-curr");
      const newTemp = Math.round((origTemp - 32) * (5/9));
      temp.innerHTML = newTemp + `&#8451`;
    } else {
      units = "C";
    }
  }
})

/* Collect Weather Data */
async function getWeather(latInp, lonInp) {
  const url = `/apiWeather?lat=${latInp}&lon=${lonInp}&units=imperial`;
  console.log(url);

  let controller = new AbortController();
  const response = await fetch(url, { signal: controller.signal });
  const myData = await response.json();
  
  origTemp = myData.main.temp;
  document.querySelector(".weather-temp-curr").innerHTML = Math.round(myData.main.temp) + `&#8457;`;
  document.querySelector(".weather-cond").innerHTML = myData.weather[0].main;
  document.querySelector(".weather-desc").innerHTML = myData.weather[0].description[0].toUpperCase() + myData.weather[0].description.slice(1);

  const weatherImg = document.createElement("img");
  weatherImg.id = "cond-pic";
  const weatherID = myData.weather[0].id;

  switch (String(weatherID)[0]) {
    case "2":
      weatherImg.src = `${imgPath}${imgFiles["thunderstorm"]}`;
      weatherImg.alt = "thunderstorm";
      break;
    case "3":
    case "5":
      weatherImg.src = `${imgPath}${imgFiles["rain"]}`;
      weatherImg.alt = "rain";
      break;
    case "6":
      weatherImg.src = `${imgPath}${imgFiles["snow"]}`;
      weatherImg.alt = "snow";
      break;
    case "7":
      if ([701, 711, 721, 741].includes(weatherID)) {
        weatherImg.src = `${imgPath}${imgFiles["fog"]}`;
        weatherImg.alt = "fog";
        break;
      } else if ([731, 751, 761].includes(weatherID)) {
        weatherImg.src = `${imgPath}${imgFiles["dust"]}`;
        weatherImg.alt = "dust";
        break;
      } else if (weatherID === 762) {
        weatherImg.src = `${imgPath}${imgFiles["ash"]}`;
        weatherImg.alt = "ash";
        break;
      } else if (weatherID === 771) {
        weatherImg.src = `${imgPath}${imgFiles["squall"]}`;
        weatherImg.alt = "squall";
        break;
      } else {
        weatherImg.src = `${imgPath}${imgFiles["tornado"]}`;
        weatherImg.alt = "tornado";
        break;
      }
    case "8":
      if ([803, 804].includes(weatherID)) {
        weatherImg.src = `${imgPath}${imgFiles["overcast"]}`;
        weatherImg.alt = "overcast";
        break;
      } else if ([801, 802].includes(weatherID)) {
        weatherImg.src = `${imgPath}${imgFiles["scatterclouds"]}`;
        weatherImg.alt = "scatterclouds";
        break;
      } else {
        weatherImg.src = `${imgPath}${imgFiles["clear"]}`;
        weatherImg.alt = "clear";
        break;
      }
  }

  if (document.getElementById("cond-pic") !== null) {
    document.getElementById("cond-pic").src = weatherImg.src;
    document.getElementById("cond-pic").alt = weatherImg.alt;
  } else {
    document.getElementById("full-ctnr").appendChild(weatherImg);
  }

  controller.abort();
}
