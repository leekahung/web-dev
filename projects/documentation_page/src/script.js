/* Setup and function for nav-ctnr__links*/
const navGroup = document.querySelector(".nav-ctnr__nav-group");

const navLinks = [
  "Introduction", "What you should already know", "JavaScript and Java",
  "Hello world", "Variables", "Declaring variables", "Variable scope",
  "Global variables", "Constants", "Data types", "if else statement",
  "while statement", "Function declarations", "Reference"
];

const createNavGroup = (inp) => {
  for (let i = 0; i < inp.length; i++) {
    const elem = document.createElement("a");
    navGroup.appendChild(elem).className = "nav-ctnr__link";
    navGroup.appendChild(elem).href = `#${inp[i].replace(/\s/g, "_")}`;
    navGroup.appendChild(elem).innerText = inp[i];
  }
};

createNavGroup(navLinks);

/* Setup and function for nav-ctnr__slider-tab */
const tabSlider = document.getElementById("nav-ctnr__slider-tab");
const navContainer = document.querySelector(".nav-ctnr");
const mainBody = document.getElementById("main-doc");
const tabArrowSym = { left: "\u25C0", right: "\u25B6" };

const tabArrow = document.createElement("div");
let arrowFacing = "left";

tabSlider.appendChild(tabArrow).innerText = tabArrowSym[arrowFacing];
tabSlider.appendChild(tabArrow).id = "tab-arrow";

tabSlider.addEventListener("click", () => {
  const tabArrowContent = document.getElementById("tab-arrow");
  if (arrowFacing == "left") {
    arrowFacing = "right";
    tabArrowContent.innerText = tabArrowSym[arrowFacing];
    navContainer.style.left = "calc(-320px * 0.95)";
    mainBody.style.left = "20px";
  } else if (arrowFacing == "right") {
    arrowFacing = "left";
    tabArrowContent.innerText = tabArrowSym[arrowFacing];
    navContainer.style.left = "0";
    mainBody.style.left = "350px";
  }
});

/* Creating observer for return-ctnr__top link */
const allSections = document.querySelectorAll("section");
const introSect = document.getElementById("Introduction");
const jsJavaSect = document.getElementById("JavaScript_and_Java");
const toTopLink = document.querySelector(".return-ctnr");

const sectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        toTopLink.classList.remove("slide-in");
        toTopLink.classList.add("slide-out");
      } else {
        toTopLink.classList.add("slide-in");
        toTopLink.classList.remove("slide-out");
      }
    });
  }
);

const mediaQuery = window.matchMedia("(max-width: 768px)")

if (mediaQuery.matches) {
  sectObserver.observe(introSect);
} else {
  sectObserver.observe(jsJavaSect);
}
