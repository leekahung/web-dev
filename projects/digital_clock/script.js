const localTime = document.getElementById("time");
const amPM = document.getElementById("ante-post");
const localTimeZone = document.getElementById("localTZ");
const twelveOrMil = document.getElementById("toggler");

function getTime() {
  let date = Date();
  let localTZ = date.match(/\([a-zA-Z\s]+/g)[0].slice(1);
  let time = date.match(/\d{2}:\d{2}:\d{2}/g)[0];
  
  localTimeZone.innerHTML = localTZ;

  if (twelveOrMil.checked) {
    localTime.innerHTML = time;
    amPM.innerHTML = "";
    document.documentElement.style.setProperty("--time-styling", "auto");
    document.documentElement.style.setProperty("--clock-size", "65vw");
  } else {
    document.documentElement.style.setProperty("--time-styling", "8%");
    document.documentElement.style.setProperty("--clock-size", "75vw");
    let hours = time.slice(0, 2);

    if (hours < 12 || hours == 24) {
      amPM.innerHTML = "AM";
      if (hours == 24) {
        localTime.innerHTML = "00" + time.slice(2); 
      } else {
        localTime.innerHTML = time;
      }
    } else {
      amPM.innerHTML = "PM"
      if (hours == 12) {
        localTime.innerHTML = time;
      } else if (hours < 22) {
        localTime.innerHTML = "0" + String(hours - 12) + time.slice(2);
      } else {
        localTime.innerHTML = String(hours - 12) + time.slice(2);
      }
    }
  }
}

let myInterval = setInterval(getTime, 1000);
let state = "on";

const clearDisplay = () => {
  localTime.innerHTML = "";
  amPM.innerHTML = "";
  localTimeZone.innerHTML = "";
}

const powerBtn = document.getElementById("power-btn");

powerBtn.addEventListener("click", () => {
  if (state === "on") {
    clearInterval(myInterval);
    clearDisplay();
    state = "off";
    console.log(state);
  } else {
    myInterval = setInterval(getTime, 1000);
    state = "on";
    console.log(state);
  }
});