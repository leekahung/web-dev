"use strict";
const darkMode = {
    backgroundColor: "rgb(40, 45, 45)",
    fontColor: "rgb(240, 240, 240)",
    navbarColor: "rgb(50, 55, 55)",
    fontColorHover: "rgb(160, 240, 240)",
    togglerColorHover: "rgba(240, 240, 240, 0.4)",
    backgroundImg: "url(./images/clear_night.webp)",
};
const lightMode = {
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
function darkLightMode() {
    const getTheme = (theme) => {
        setColorScheme.map((item) => {
            document.documentElement.style.setProperty(item[0], theme[item[1]]);
        });
    };
    const toggle = document.getElementById("nav-bar__toggle");
    const navbar = document.getElementById("nav-bar");
    const githubIcon = document.getElementById("github-icon");
    if (toggle.checked) {
        toggle.disabled = true;
        setTimeout(() => {
            toggle.disabled = false;
        }, 2000);
        navbar.style.backgroundColor = lightMode["navbarColor"];
        githubIcon.style.filter = "brightness(0)";
        getTheme(lightMode);
    }
    else {
        toggle.disabled = true;
        setTimeout(() => {
            toggle.disabled = false;
        }, 2000);
        navbar.style.backgroundColor = darkMode["navbarColor"];
        githubIcon.style.filter = "brightness(100%)";
        getTheme(darkMode);
    }
}
const handleHover = (event) => {
    const source = event.target;
    const localCtnrCard = source.closest(".proj-ctnr__card");
    let localRepoLink;
    if (event.type === "mouseenter") {
        if (localCtnrCard.classList.contains("focus-hover")) {
            localCtnrCard.classList.remove("focus-hover");
        }
        localCtnrCard.style.boxShadow = "var(--focus-visible-shadow)";
        localRepoLink = localCtnrCard.children[1];
        if (localRepoLink.style.boxShadow !== "unset") {
            localRepoLink.style.boxShadow = "unset";
        }
        localRepoLink.addEventListener("mouseenter", (event) => {
            const repoLink = event.target;
            repoLink.style.boxShadow = "var(--focus-visible-shadow)";
            localCtnrCard.style.boxShadow = "unset";
            if (repoLink.classList.contains("focus-hover")) {
                repoLink.classList.remove("focus-hover");
            }
        });
    }
    else {
        localCtnrCard.removeAttribute("style");
    }
};
const handleFocus = (event) => {
    const source = event.target;
    const parent = source.parentElement;
    const localCtnrCard = parent.closest(".proj-ctnr__card");
    const localRepoLink = localCtnrCard.children[1];
    if (event.type === "focusin") {
        parent.classList.add("focus-hover");
        parent.style.boxShadow = "var(--focus-visible-shadow)";
        setTimeout(() => {
            parent.classList.remove("focus-hover");
            localRepoLink.style.boxShadow = "unset";
        }, 100);
    }
    else {
        parent.classList.remove("focus-hover");
        parent.style.boxShadow = "unset";
    }
};
const projLinks = document.querySelectorAll(".proj-ctnr__link");
projLinks.forEach((link) => {
    ["mouseenter", "mouseleave"].forEach((eventType) => {
        link.addEventListener(eventType, (event) => handleHover(event));
    });
});
projLinks.forEach((link) => {
    ["focusin", "focusout"].forEach((eventType) => {
        link.addEventListener(eventType, (event) => handleFocus(event));
    });
});
projLinks.forEach((link) => {
    ["click"].forEach((eventType) => {
        link.addEventListener(eventType, (event) => handleHover(event));
    });
});
const hideSeeMore = (selectorId) => {
    const seeMoreLink = document.querySelector(selectorId);
    seeMoreLink === null || seeMoreLink === void 0 ? void 0 : seeMoreLink.classList.remove("show-delay");
    seeMoreLink === null || seeMoreLink === void 0 ? void 0 : seeMoreLink.classList.add("hidden-full");
};
const hiddenSections = document.querySelectorAll("section");
const homePage = document.getElementById("home");
const topBtn = document.getElementById("top-btn-ctnr");
const options = (threshold) => {
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
                }
                else {
                    if (child.id !== "home__intro") {
                        child.classList.add("show-delay");
                        observer.unobserve(entry.target);
                    }
                    else {
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
        const navLink = document.querySelector(`.nav-bar__link[href="#${sect}"]`) ||
            document.querySelector("#home-link");
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            navLink.classList.add("nav-link-hover");
        }
        else {
            navLink.classList.remove("nav-link-hover");
        }
    });
}, options(0.25));
const btnObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            topBtn.classList.add("slide-in");
            topBtn.classList.remove("slide-out");
        }
        else {
            topBtn.classList.add("slide-out");
            topBtn.classList.remove("slide-in");
        }
    });
}, options(0.2));
hiddenSections.forEach((sect) => sectObserver.observe(sect));
hiddenSections.forEach((sect) => sectNavObserver.observe(sect));
btnObserver.observe(homePage);
const boxCtnr = document.querySelector(".boxes-ctnr");
const boxCtnr2 = document.querySelector(".boxes-ctnr-2");
const boxCtnr3 = document.querySelector(".boxes-ctnr-3");
const boxCtnr4 = document.querySelector(".boxes-ctnr-4");
const allBoxCtnr = [boxCtnr, boxCtnr2, boxCtnr3, boxCtnr4];
const fallSpeeds = ["super-slow", "slow", "normal", "fast", "super-fast"];
const shape = ["small-box", "circle", "box"];
const makeBoxes = (numShapes, ctnrNum) => {
    for (let i = 0; i < numShapes; i++) {
        const box = document.createElement("div");
        const spin = document.createElement("div");
        const fallSpeed = fallSpeeds[Math.floor(Math.random() * fallSpeeds.length)];
        const shapeSize = shape[Math.floor(Math.random() * shape.length)];
        spin.className = "spin";
        spin.classList.add(shapeSize);
        box.className = fallSpeed;
        box.classList.add("fall-animation");
        box.appendChild(spin);
        allBoxCtnr[ctnrNum].appendChild(box);
    }
};
makeBoxes(3, 0);
setTimeout(() => {
    makeBoxes(4, 1);
}, 5000);
setTimeout(() => {
    makeBoxes(3, 2);
}, 10000);
setTimeout(() => {
    makeBoxes(2, 3);
}, 15000);
