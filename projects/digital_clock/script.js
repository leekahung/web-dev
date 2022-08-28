const yourTime = document.getElementById("time");
const amTime = document.getElementById("am");
const pmTime = document.getElementById("pm");
const yourTZ = document.getElementById("localTZ");

function getTime() {
  let date = Date();
  let localTZ = date.match(/\([a-zA-Z\s]+/g)[0].slice(1);
  let time = date.match(/\d{2}:\d{2}:\d{2}/g)[0];
  let hours = time.slice(0, 2);
  if (hours[0] === "0") {
      yourTime.innerHTML = time;
      amTime.style.opacity = 1;
      yourTZ.innerHTML = localTZ;
  } else {
    if (Number(hours) < 12) {
        yourTime.innerHTML = time;
        amTime.style.opacity = 1;
        yourTZ.innerHTML = localTZ;
    } else if (Number(hours) == 12) {
        yourTime.innerHTML = time;
        pmTime.style.opacity = 1;
        yourTZ.innerHTML = localTZ;
    } else if (Number(hours) < 22) {
        yourTime.innerHTML = "0" + String(hours - 12) + time.slice(2);
        pmTime.style.opacity = 1;
        yourTZ.innerHTML = localTZ;
    } else {
        yourTime.innerHTML = String(hours - 12) + time.slice(2);
        pmTime.style.opacity = 1;
        yourTZ.innerHTML = localTZ;
    }
  }
}

setInterval(getTime, 1000);