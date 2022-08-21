let darkModeSet = {
  backgroundColor: "rgb(40, 40, 40)",
  fontColor: "lightgrey",
  navbarColor: "lightgrey"
}

let lightModeColors = {
  backgroundColor: "rgba(0, 127, 255, 0.4)",
  fontColor: "black",
  navbarColor: "orange"
}

function darkLightMode() {
  if (document.getElementById("toggle").checked == false) {
    document.body.style.backgroundColor = darkModeSet["backgroundColor"];
    document.body.style.color = darkModeSet["fontColor"];
    document.querySelector(".nav-bar").style.backgroundColor = darkModeSet["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(100)";
    document.documentElement.style.setProperty("--animation-border-color-end", "lightgrey");
  } else {
    document.body.style.backgroundColor = lightModeColors["backgroundColor"];
    document.body.style.color = lightModeColors["fontColor"];
    document.querySelector(".nav-bar").style.backgroundColor = lightModeColors["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(0)";
    document.documentElement.style.setProperty("--animation-border-color-end", "black");
  }
}