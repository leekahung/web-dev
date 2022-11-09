function runClock() {
  const localTime = document.getElementById("clock__time");
  const amPM = document.getElementById("clock__ante-post");
  const localTimeZone = document.getElementById("footer__localTZ");
  const twelveOrMil = document.getElementById("switch-ctnr__toggler");

  /* Function to get time */
  function getTime() {
    let date = Date();
    let localTZ = date.match(/\([a-zA-Z\s]+/g)[0].slice(1);
    let time = date.match(/\d{2}:\d{2}:\d{2}/g)[0];

    localTimeZone.innerText = localTZ;

    if (twelveOrMil.checked) {
      localTime.innerText = time;
      amPM.innerText = "";
      document.documentElement.style.setProperty("--time-styling", "auto");
      document.documentElement.style.setProperty("--clock-size", "65vw");
    } else {
      document.documentElement.style.setProperty("--time-styling", "8%");
      document.documentElement.style.setProperty("--clock-size", "75vw");
      let hours = time.slice(0, 2);

      if (hours < 12 || hours == 24) {
        amPM.innerText = "AM";
        if (hours == 24) {
          localTime.innerText = "00" + time.slice(2);
        } else {
          localTime.innerText = time;
        }
      } else {
        amPM.innerText = "PM";
        if (hours == 12) {
          localTime.innerText = time;
        } else if (hours < 22) {
          localTime.innerText = "0" + String(hours - 12) + time.slice(2);
        } else {
          localTime.innerText = String(hours - 12) + time.slice(2);
        }
      }
    }
  }

  /* Function to turn on and off clock */
  let myInterval = setInterval(getTime, 1000);
  let state = "on";

  document.getElementById("power-btn").addEventListener("click", () => {
    if (state === "on") {
      clearInterval(myInterval);
      localTime.innerText = "";
      amPM.innerText = "";
      localTimeZone.innerText = "";
      state = "off";
    } else {
      myInterval = setInterval(getTime, 1000);
      state = "on";
      getTime();
    }
  });
}

runClock();
