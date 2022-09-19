/* Function to change theme color */
function darkLightMode() {
  const darkMode = {
    backgroundColor: "rgb(40, 45, 45)",
    fontColor: "rgb(240, 240, 240)",
    navbarColor: "rgb(50, 55, 55)",
    fontColorHover: "rgb(160, 240, 240)",
  };

  const lightMode = {
    backgroundColor: "rgba(240, 240, 240)",
    fontColor: "black",
    navbarColor: "rgb(200, 200, 200)",
    fontColorHover: "rgba(0, 127, 255)",
  };

  const setColorScheme = [
    ["--animation-border-color-end", "fontColor"],
    ["--color-back", "backgroundColor"],
    ["--color-sec", "navbarColor"],
    ["--color-font", "fontColor"],
    ["--color-font-hover", "fontColorHover"],
  ];

  const getTheme = (theme) => {
    for (let i = 0; i < setColorScheme.length; i++) {
      document.documentElement.style.setProperty(
        setColorScheme[i][0],
        theme[setColorScheme[i][1]]
      );
    }
  };

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
const hiddenSections = document.querySelectorAll("section");
const homePage = document.getElementById("home");
const topBtn = document.getElementById("top-btn-container");

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
    threshold: "0.35",
  }
);

const btnObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        topBtn.classList.add("slideIn");
        topBtn.classList.remove("slideOut");
      } else {
        topBtn.classList.add("slideOut");
        topBtn.classList.remove("slideIn");
      }
    });
  },
  {
    root: document.body.main,
    threshold: "0.8",
  }
);

hiddenSections.forEach((sect) => sectObserver.observe(sect));
btnObserver.observe(homePage);
