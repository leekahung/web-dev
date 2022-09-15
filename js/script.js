/* Function to change theme color */
const darkMode = {
  backgroundColor: "rgb(40, 40, 40)",
  fontColor: "rgb(240, 240, 240)",
  navbarColor: "rgb(240, 240, 240)"
};

const lightMode = {
  backgroundColor: "rgba(0, 127, 255, 0.4)",
  fontColor: "black",
  navbarColor: "orange"
};

const rootVariables = ["--animation-border-color-end", "--color-back", "--color-sec", "--color-font"];
const colorOrder = ["fontColor", "backgroundColor", "navbarColor", "fontColor"];

const getTheme = (theme) => {
  for (let i = 0; i < rootVariables.length; i++) {
    document.documentElement.style.setProperty(rootVariables[i], theme[colorOrder[i]]);
  }
};

function darkLightMode() {
  if (document.getElementById("toggle").checked == false) {
    document.querySelector(".nav-bar").style.backgroundColor = darkMode["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(100)";
    document.querySelector(".self-photo").style.opacity = 0.7;
    getTheme(darkMode);
  } else {
    document.querySelector(".nav-bar").style.backgroundColor = lightMode["navbarColor"];
    document.querySelector(".github-icon").style.filter = "brightness(0)";
    document.querySelector(".self-photo").style.opacity = 1;
    getTheme(lightMode);
  }
}

/* Function to deal with scrolling animation */
const hiddenSections = document.querySelectorAll(".hidden");

const sectObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: document.body.main,
    threshold: "0.50",
  }
);

hiddenSections.forEach((sect) => sectObserver.observe(sect));
