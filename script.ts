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
  fontColor: "rgb(40, 45, 45)",
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

/* Function to change theme color */
function darkLightMode() {
  const getTheme = (theme: Theme) => {
    setColorScheme.map((item) => {
      document.documentElement.style.setProperty(
        item[0],
        theme[item[1] as keyof Theme]
      );
    });
  };

  const toggle = document.getElementById("nav-bar__toggle") as HTMLInputElement;
  const navbar = document.getElementById("nav-bar") as HTMLElement;
  const githubIcon = document.getElementById("github-icon") as HTMLElement;

  if (toggle.checked) {
    toggle.disabled = true;
    setTimeout(() => {
      toggle.disabled = false;
    }, 2000);

    navbar.style.backgroundColor = lightMode["navbarColor"];
    githubIcon.style.filter = "brightness(0)";
    getTheme(lightMode);
  } else {
    toggle.disabled = true;
    setTimeout(() => {
      toggle.disabled = false;
    }, 2000);

    navbar.style.backgroundColor = darkMode["navbarColor"];
    githubIcon.style.filter = "brightness(100%)";
    getTheme(darkMode);
  }
}

/* Functions to deal with scrolling animation via Intersection Observer */
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
          if (child.id !== "home__intro") {
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
      `.nav-bar__link[href="#${sect}"]`
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
      topBtn.classList.add("slide-in");
      topBtn.classList.remove("slide-out");
    } else {
      topBtn.classList.add("slide-out");
      topBtn.classList.remove("slide-in");
    }
  });
}, options(0.2));

hiddenSections.forEach((sect) => sectObserver.observe(sect));
hiddenSections.forEach((sect) => sectNavObserver.observe(sect));
btnObserver.observe(homePage);

/* Removing internal anchor tags when changing sections or using to Top button */
const internalLinks =
  document.querySelectorAll<HTMLAnchorElement>(".nav-bar__link");
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
const boxCtnr = document.querySelector(".boxes-ctnr") as HTMLDivElement;
const boxCtnr2 = document.querySelector(".boxes-ctnr-2") as HTMLDivElement;
const boxCtnr3 = document.querySelector(".boxes-ctnr-3") as HTMLDivElement;
const boxCtnr4 = document.querySelector(".boxes-ctnr-4") as HTMLDivElement;
const allBoxCtnr = [boxCtnr, boxCtnr2, boxCtnr3, boxCtnr4];

const fallSpeeds = ["super-slow", "slow", "normal", "fast", "super-fast"];
const boxSizes = ["small-box", "medium-box", "large-box"];

const makeBoxes = (numBoxes: number, ctnrNum: number) => {
  for (let i = 0; i < numBoxes; i++) {
    const box = document.createElement("div");
    const spin = document.createElement("div");
    const fallSpeed = fallSpeeds[Math.floor(Math.random() * fallSpeeds.length)];
    const boxSize = boxSizes[Math.floor(Math.random() * boxSizes.length)];

    spin.className = "spin";
    spin.classList.add(boxSize);
    box.className = fallSpeed;
    box.classList.add("fall-animation");

    box.appendChild(spin);
    allBoxCtnr[ctnrNum].appendChild(box);
  }
};

makeBoxes(5, 0);

setTimeout(() => {
  makeBoxes(3, 1);
}, 3000);

setTimeout(() => {
  makeBoxes(2, 2);
}, 7000);

setTimeout(() => {
  makeBoxes(4, 3);
}, 10000);
