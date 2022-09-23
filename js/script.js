/* Function to change theme color */
function darkLightMode() {
  const darkMode = {
    backgroundColor: "rgb(40, 45, 45)",
    fontColor: "rgb(240, 240, 240)",
    navbarColor: "rgb(50, 55, 55)",
    fontColorHover: "rgb(160, 240, 240)",
    togglerColorHover: "rgba(240, 240, 240, 0.4)",
  };

  const lightMode = {
    backgroundColor: "rgba(240, 240, 240)",
    fontColor: "black",
    navbarColor: "rgb(200, 200, 200)",
    fontColorHover: "rgba(0, 127, 255)",
    togglerColorHover: "rgba(0, 0, 0, 0.4)",
  };

  const setColorScheme = [
    ["--animation-border-color-end", "fontColor"],
    ["--color-back", "backgroundColor"],
    ["--color-sec", "navbarColor"],
    ["--color-font", "fontColor"],
    ["--color-font-hover", "fontColorHover"],
    ["--color-toggler-hover", "togglerColorHover"],
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
    document.getElementById("nav-bar").style.backgroundColor = darkMode["navbarColor"];
    document.getElementById("github-icon").style.filter = "brightness(100)";
    document.querySelector(".self-photo").style.opacity = 0.7;
    getTheme(darkMode);
  } else {
    document.getElementById("nav-bar").style.backgroundColor = lightMode["navbarColor"];
    document.getElementById("github-icon").style.filter = "brightness(0)";
    document.querySelector(".self-photo").style.opacity = 1;
    getTheme(lightMode);
  }
}

/* Function to deal with project card animation */
const projCtnr = document.querySelector(".proj-ctnr");

["mouseover", "onmousedown"].forEach((eventType) => {
  projCtnr.addEventListener(eventType, (event) => {
    if (["card-bottom", "proj-desc", "desc"].includes(event.target.classList[0])) {
      event.target.closest(".proj-ctnr-links").style.boxShadow = "var(--proj-card-box-shadow)";
    } else if (event.target.classList.value === "repo-link") {
      event.target.style.boxShadow = "var(--proj-card-box-shadow)";
    }
  });
});

projCtnr.addEventListener("mouseout", (event) => {
  if (["card-bottom", "proj-desc", "desc"].includes(event.target.classList[0])) {
    event.target.closest(".proj-ctnr-links").style.boxShadow = "unset";
  } else if (event.target.classList.value === "repo-link") {
    event.target.style.boxShadow = "unset";
  }
});

const projCard = document.querySelectorAll(".proj-card");

projCard.forEach((card) =>
  card.addEventListener("focusin", (event) => {
    const parent = event.target.parentElement;
    parent.classList.add("focus-hover");
    parent.style.boxShadow = "var(--proj-card-box-shadow)";

    event.target.nextElementSibling.addEventListener("focusin",
      (sibling) => {
        parent.classList.add("focus-hover");
        sibling.target.style.boxShadow = "var(--proj-card-box-shadow)";
        sibling.target.style.outlineStyle = "none";
      });
    event.target.nextElementSibling.addEventListener("focusout",
      (sibling) => {
        parent.classList.remove("focus-hover");
        sibling.target.style.boxShadow = "unset";
      });
  })
);

projCard.forEach((card) =>
  card.addEventListener("focusout", (event) => {
    event.target.parentElement.style.boxShadow = "unset";
  })
);

/* Function to deal with scrolling animation */
const hiddenSections = document.querySelectorAll("section");
const homePage = document.getElementById("home");
const topBtn = document.getElementById("top-btn-ctnr");

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

/* Removing internal anchor tags when changing sections or using to Top button */
const internalLinks = document.querySelectorAll(".nav-link");
const topBtnLink = document.getElementById("top-btn-link");

[...internalLinks, topBtnLink].forEach((link) => {
  const anchor = document.querySelector(link.hash);

  link.addEventListener("click", (event) => {
    anchor.scrollIntoView();
    event.preventDefault();
  });
});
