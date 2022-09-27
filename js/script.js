/* Function to change theme color */
function darkLightMode() {
  const darkMode = {
    backgroundColor: "rgb(40, 45, 45)",
    fontColor: "rgb(240, 240, 240)",
    navbarColor: "rgb(50, 55, 55)",
    fontColorHover: "rgb(160, 240, 240)",
    togglerColorHover: "rgba(240, 240, 240, 0.4)",
    backgroundImg: "url(../images/clear_night.webp)",
  };

  const lightMode = {
    backgroundColor: "rgba(240, 240, 240)",
    fontColor: "black",
    navbarColor: "rgb(200, 200, 200)",
    fontColorHover: "rgba(0, 127, 255)",
    togglerColorHover: "rgba(0, 0, 0, 0.4)",
    backgroundImg: "url(../images/overcast.webp)",
  };

  const setColorScheme = [
    ["--animation-border-color-end", "fontColor"],
    ["--color-back", "backgroundColor"],
    ["--color-sec", "navbarColor"],
    ["--color-font", "fontColor"],
    ["--color-font-hover", "fontColorHover"],
    ["--color-toggler-hover", "togglerColorHover"],
    ["--hero-header-url", "backgroundImg"],
  ];

  const getTheme = (theme) => {
    for (let i = 0; i < setColorScheme.length; i++) {
      document.documentElement.style.setProperty(
        setColorScheme[i][0],
        theme[setColorScheme[i][1]]
      );
    }
  };

  if (document.getElementById("toggle").checked) {
    document.getElementById("nav-bar").style.backgroundColor = lightMode["navbarColor"];
    document.getElementById("github-icon").style.filter = "brightness(0)";
    document.querySelector(".self-photo").style.opacity = 1;
    getTheme(lightMode);
  } else {
    document.getElementById("nav-bar").style.backgroundColor = darkMode["navbarColor"];
    document.getElementById("github-icon").style.filter = "brightness(100%)";
    document.querySelector(".self-photo").style.opacity = 0.7;
    getTheme(darkMode);
  }
}

/* Function to deal with project card animation */
const handleHover = (event) => {
  const source = event.target;

  if (source.classList.value === "proj-ctnr") {
    return;
  }

  const localCtnrLink = source.closest(".proj-ctnr-links");
  let localRepoLink;

  if (event.type !== "mouseout") {
    if (localCtnrLink !== null && localCtnrLink.classList.length > 1) {
      localCtnrLink.classList.remove("focus-hover");
    }

    if (["card-bottom", "proj-desc", "desc"].includes(source.classList[0])) {
      localRepoLink = localCtnrLink.children[1];
      localCtnrLink.style.boxShadow = "var(--proj-card-box-shadow)";
      localRepoLink.style.boxShadow = "unset";
    } else if (source.classList.value === "repo-link") {
      source.style.boxShadow = "var(--proj-card-box-shadow)";
    }
  } else {
    if (["card-bottom", "proj-desc", "desc"].includes(source.classList[0])) {
      localCtnrLink.style.boxShadow = "unset";
    } else if (source.classList.value === "repo-link") {
      source.style.boxShadow = "unset";
    }
  }
};

const handleFocus = (event) => {
  const parent = event.target.parentElement;
  const localCtnrLink = parent.closest(".proj-ctnr-links");
  const localRepoLink = localCtnrLink.children[1];

  if (event.type === "focusin") {
    parent.classList.add("focus-hover");
    parent.style.boxShadow = "var(--proj-card-box-shadow)";

    localRepoLink.addEventListener("focusin", () => {
      parent.classList.add("focus-hover");
      localRepoLink.style.boxShadow = "var(--proj-card-box-shadow";
    });
    localRepoLink.addEventListener("focusout", () => {
      parent.classList.remove("focus-hover");
      localRepoLink.style.boxShadow = "unset";
    });
  } else {
    parent.style.boxShadow = "unset";
  }
};

const projCtnr = document.querySelector(".proj-ctnr");
const projCard = document.querySelectorAll(".proj-card");

["mouseover", "onmousedown", "mouseout"].forEach((eventType) =>
  projCtnr.addEventListener(eventType, (event) => handleHover(event))
);

projCard.forEach((card) => {
  ["focusin", "focusout"].forEach((eventType) => {
    card.addEventListener(eventType, (event) => handleFocus(event));
  });
});

/* Function to deal with scrolling animation */
const hiddenSections = document.querySelectorAll("section");
const homePage = document.getElementById("home");
const topBtn = document.getElementById("top-btn-ctnr");

const sectObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.firstElementChild.classList.add("slide-down-header");
        if (entry.target.lastElementChild.id !== "home-intro") {
          entry.target.lastElementChild.classList.add("show-delay");
          observer.unobserve(entry.target);
        } else {
          observer.unobserve(entry.target);
        }
      }
    });
  },
  {
    threshold: 0.2,
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
    threshold: 0.2,
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
