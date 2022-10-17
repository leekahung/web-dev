/* Function to change theme color */
function darkLightMode() {
  interface Theme {
    backgroundColor: string;
    fontColor: string;
    navbarColor: string;
    fontColorHover: string;
    togglerColorHover: string;
    backgroundImg: string;
  }

  const darkMode: Theme = {
    backgroundColor: "rgb(40, 45, 45)",
    fontColor: "rgb(240, 240, 240)",
    navbarColor: "rgb(50, 55, 55)",
    fontColorHover: "rgb(160, 240, 240)",
    togglerColorHover: "rgba(240, 240, 240, 0.4)",
    backgroundImg: "url(./images/clear_night.webp)",
  };

  const lightMode: Theme = {
    backgroundColor: "rgba(240, 240, 240)",
    fontColor: "black",
    navbarColor: "rgb(200, 200, 200)",
    fontColorHover: "rgba(0, 127, 255)",
    togglerColorHover: "rgba(0, 0, 0, 0.4)",
    backgroundImg: "url(./images/overcast.webp)",
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

  const getTheme = (theme: Theme) => {
    setColorScheme.map((item) => {
      document.documentElement.style.setProperty(
        item[0],
        theme[item[1] as keyof Theme]
      );
    });
  };

  const toggle = document.getElementById("toggle") as HTMLInputElement;
  const navbar = document.getElementById("nav-bar") as HTMLElement;
  const githubIcon = document.getElementById("github-icon") as HTMLElement;

  if (toggle.checked) {
    navbar.style.backgroundColor = lightMode["navbarColor"];
    githubIcon.style.filter = "brightness(0)";
    getTheme(lightMode);
  } else {
    navbar.style.backgroundColor = darkMode["navbarColor"];
    githubIcon.style.filter = "brightness(100%)";
    getTheme(darkMode);
  }
}

/* Function to deal with project card animation */
const handleHover = (event: Event) => {
  const source = event.target as HTMLElement;

  if (source.classList.value === "proj-ctnr") {
    return;
  }

  const localCtnrLink = source.closest(".proj-ctnr-links") as HTMLElement;
  let localRepoLink;

  if (event.type !== "mouseout") {
    if (localCtnrLink !== null && localCtnrLink.classList.length > 1) {
      localCtnrLink.classList.remove("focus-hover");
    }

    if (["slide-in-color", "proj-desc", "desc"].includes(source.classList[0])) {
      localCtnrLink.style.boxShadow = "var(--proj-card-box-shadow)";
      localRepoLink = localCtnrLink.children[1] as HTMLAnchorElement;
      localRepoLink.style.boxShadow = "unset";
    } else if (source.classList.value === "repo-span") {
      source.style.boxShadow = "var(--proj-card-box-shadow)";
    }
  } else {
    if (["slide-in-color", "proj-desc", "desc"].includes(source.classList[0])) {
      localCtnrLink.style.boxShadow = "unset";
      if (localCtnrLink.classList.length > 1) {
        localCtnrLink.classList.remove("focus-hover");
      }
    } else if (source.classList.value === "repo-span") {
      source.style.boxShadow = "unset";
    }
  }
};

const handleFocus = (event: Event) => {
  const source = event.target as HTMLElement;
  const parent = source.parentElement as HTMLElement;
  const localCtnrLink = parent.closest(".proj-ctnr-links") as HTMLElement;
  const localRepoLink = localCtnrLink.children[1] as HTMLAnchorElement;

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

const projCtnr = document.querySelector(".proj-ctnr") as HTMLElement;
const projCard = document.querySelectorAll<HTMLAnchorElement>(".proj-card");

["mouseover", "onmousedown", "mouseout"].forEach((eventType) => {
  if (projCtnr) {
    projCtnr.addEventListener(eventType, (event) => handleHover(event));
  }
});

projCard.forEach((card) => {
  ["focusin", "focusout"].forEach((eventType) => {
    card.addEventListener(eventType, (event) => handleFocus(event));
  });
});

/* Function to deal with scrolling animation */
const hiddenSections = document.querySelectorAll("section");
const homePage = document.getElementById("home") as HTMLElement;
const topBtn = document.getElementById("top-btn-ctnr") as HTMLElement;
const options = (threshold: number) => {
  return { threshold: threshold };
};

const sectObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      entry.target.classList.add("show");
      const targetChildren = entry.target.children;

      [...targetChildren].map((child, index) => {
        if (index === 0) {
          child.classList.add("slide-down-header");
        } else {
          if (child.id !== "home-intro") {
            child.classList.add("show-delay");
            observer.unobserve(entry.target);
          } else {
            observer.unobserve(entry.target);
          }
        }
      });
    }
  });
}, options(0.2));

const sectNavObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sect = entry.target.id;
    const navLink = document.querySelector(
      `.nav-link[href="#${sect}"]`
    ) as HTMLAnchorElement;
    if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
      navLink.classList.add("nav-link-hover");
    } else {
      navLink.classList.remove("nav-link-hover");
    }
  });
}, options(0.25));

const btnObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      topBtn.classList.add("slideIn");
      topBtn.classList.remove("slideOut");
    } else {
      topBtn.classList.add("slideOut");
      topBtn.classList.remove("slideIn");
    }
  });
}, options(0.2));

hiddenSections.forEach((sect) => sectObserver.observe(sect));
hiddenSections.forEach((sect) => sectNavObserver.observe(sect));
btnObserver.observe(homePage);

/* Removing internal anchor tags when changing sections or using to Top button */
const internalLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
const topBtnLink = document.getElementById("top-btn-link") as HTMLAnchorElement;

[...internalLinks, topBtnLink].forEach((link) => {
  const anchor = document.querySelector(link.hash);

  link.addEventListener("click", (event) => {
    if (anchor) {
      anchor.scrollIntoView();
      event.preventDefault();
    }
  });
});

/* Falling box animations for About Section */
const boxCtnr = document.querySelector(".boxes-ctnr") as HTMLSpanElement;
const fallSpeeds = ["super-slow", "slow", "normal", "fast", "super-fast"];
const boxSizes = ["small", "medium", "large"];

const makeBoxes = (numBoxes: number) => {
  for (let i = 0; i < numBoxes; i++) {
    const box = document.createElement("span");
    const spin = document.createElement("span");
    const fallSpeed = fallSpeeds[Math.floor(Math.random() * fallSpeeds.length)];
    const boxSize = boxSizes[Math.floor(Math.random() * boxSizes.length)];

    spin.className = "spin";
    spin.classList.add(boxSize);
    box.className = fallSpeed;

    box.appendChild(spin);
    boxCtnr.appendChild(box);
  }
};

makeBoxes(7);
