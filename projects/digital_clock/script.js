const localTime = document.getElementById("time");
const amPM = document.getElementById("ante-post");
const localTimeZone = document.getElementById("localTZ");

function getTime() {
  let date = Date();
  let localTZ = date.match(/\([a-zA-Z\s]+/g)[0].slice(1);
  let time = date.match(/\d{2}:\d{2}:\d{2}/g)[0];
  let hours = time.slice(0, 2);

  localTimeZone.innerHTML = localTZ;

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

setInterval(getTime, 1000);