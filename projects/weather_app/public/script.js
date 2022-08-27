/* Save Location */
document.getElementById("submit-search").onclick = function() {
  const locSearch = document.getElementById("loc-input");

  let locName = locSearch.value;
  storeLoc(locName);
}

async function storeLoc(locInp) {
  locInp = locInp.toLowerCase().split(",").map(item => item.trim().replace(" ", "%20")).join(",");
  const urlLoc = `/apiLoc?q=${locInp}&limit=5`;
  //console.log(urlLoc);

  let controller = new AbortController();
  const response = await fetch(urlLoc, { signal: controller.signal });
  const myData = await response.json();

  if (myData.length === 0) {
    alert("Location not found! Please try again.")
    return;
  }

  if (locInp.split(",").length > 1) {
    const likelyLoc = myData.filter(item => item.state.toLowerCase() === locInp.split(",")[1]);

    if (likelyLoc.length !== 0) {
      lat = likelyLoc[0].lat;
      lon = likelyLoc[0].lon;
      document.querySelector("#loc-name").innerHTML = [likelyLoc[0].name, likelyLoc[0].state, likelyLoc[0].country].join(", ");
      getWeather(lat, lon);
    } else {
      lat = myData[0].lat;
      lon = myData[0].lon;
      document.querySelector("#loc-name").innerHTML = [myData[0].name, myData[0].state, myData[0].country].join(", ");
      getWeather(lat, lon);
    }
  } else {
    lat = myData[0].lat;
    lon = myData[0].lon;
    if (!myData[0].hasOwnProperty("state")) {
      document.querySelector("#loc-name").innerHTML = [myData[0].name, myData[0].country].join(", ");
    } else {
      document.querySelector("#loc-name").innerHTML = [myData[0].name, myData[0].state, myData[0].country].join(", ");
    }
    getWeather(lat, lon);
  }
  controller.abort();
}

/* Website Variables and Containers */
let units = "F"; // default to F
let origTemp = 0;
const weatherCtnr = document.querySelector("#weather-ctnr");

function makeCurrWeatherCtnr() {
  const ctnrClasses = ["ctnr-header", "ctnr-body"];
  const ctnrBodySections = ["ctnr-body-top", "ctnr-body-bottom"];
  const ctnrData = ["weather-temp-curr", "weather-cond", "weather-desc"];
  const celFahrSym = [`&#8457;`, `&#8451;`];
  const celFahrLet = ["F", "C"];

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
  for (let l = 0; l < celFahrSym.length; l++) {
    const elem = document.createElement("button");
    celFahrBtns.appendChild(elem).className = `temp-units ${celFahrLet[l]}`;
    celFahrBtns.appendChild(elem).innerHTML = celFahrSym[l];
  }
}

makeCurrWeatherCtnr();

/* Toggle for Temp Units */

document.querySelector(".F").addEventListener("click", function() {
  if (document.getElementById("loc-name").innerHTML !== "") {
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
  if (document.getElementById("loc-name").innerHTML !== "") {
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
  //console.log(url);

  let controller = new AbortController();
  const response = await fetch(url, { signal: controller.signal });
  const myData = await response.json();
  
  origTemp = myData.main.temp;
  document.querySelector(".weather-temp-curr").innerHTML = Math.round(myData.main.temp) + `&#8457;`;
  document.querySelector(".weather-cond").innerHTML = myData.weather[0].main;
  document.querySelector(".weather-desc").innerHTML = myData.weather[0].description[0].toUpperCase() + myData.weather[0].description.slice(1);

  controller.abort();
}