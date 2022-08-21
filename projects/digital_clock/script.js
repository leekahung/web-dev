function getTime() {
  let date = Date();
  let localTZ = date.match(/\([a-zA-Z\s]+/g)[0].slice(1);
  let time = date.match(/\d{2}:\d{2}:\d{2}/g)[0];
  let hours = time.slice(0, 2);
  if (hours[0] === "0") {
    return (
      document.getElementById("time").innerHTML = time,
      document.getElementById("am").style.opacity = 1,
      document.getElementById("localTZ").innerHTML = localTZ
    );
  } else {
    if (Number(hours) < 12) {
      return (
        document.getElementById("time").innerHTML = time,
        document.getElementById("am").style.opacity = 1,
        document.getElementById("localTZ").innerHTML = localTZ
      );
    } else if (Number(hours) == 12) {
      return (
        document.getElementById("time").innerHTML = time,
        document.getElementById("pm").style.opacity = 1,
        document.getElementById("localTZ").innerHTML = localTZ
      );
    } else if (Number(hours) < 22) {
      return (
        document.getElementById("time").innerHTML = "0" + String(hours - 12) + time.slice(2),
        document.getElementById("pm").style.opacity = 1,
        document.getElementById("localTZ").innerHTML = localTZ
      )
    } else {
      return (
        document.getElementById("time").innerHTML = String(hours - 12) + time.slice(2),
        document.getElementById("pm").style.opacity = 1,
        document.getElementById("localTZ").innerHTML = localTZ
      ) 
    }
  }
}


setInterval(getTime, 1000);