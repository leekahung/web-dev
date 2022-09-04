const darkMode = {
  backgroundColor: "rgb(40, 40, 40)",
  fontColor: "rgb(240, 240, 240)",
  navbarColor: "rgb(240, 240, 240)"
}

const lightMode = {
  backgroundColor: "rgba(0, 127, 255, 0.4)",
  fontColor: "black",
  navbarColor: "orange"
}

function darkLightMode() {
  if (document.getElementById("toggle").checked == false) {
    document.querySelector(".nav-bar").style.backgroundColor = darkMode["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(100)";
    document.documentElement.style.setProperty("--animation-border-color-end", darkMode["fontColor"]);
    document.documentElement.style.setProperty("--color-back", darkMode["backgroundColor"]);
    document.documentElement.style.setProperty("--color-sec", darkMode["navbarColor"]);
    document.documentElement.style.setProperty("--color-font", darkMode["fontColor"]);
  } else {
    document.querySelector(".nav-bar").style.backgroundColor = lightMode["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(0)";
    document.documentElement.style.setProperty("--animation-border-color-end", lightMode["fontColor"]);
    document.documentElement.style.setProperty("--color-back", lightMode["backgroundColor"]);
    document.documentElement.style.setProperty("--color-sec", lightMode["navbarColor"]);
    document.documentElement.style.setProperty("--color-font", lightMode["fontColor"]);
  }
}
