"use strict";
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
            document.documentElement.style.setProperty(setColorScheme[i][0], theme[setColorScheme[i][1]]);
        }
    };
    const toggle = document.getElementById("toggle");
    const navbar = document.getElementById("nav-bar");
    const githubIcon = document.getElementById("github-icon");
    if (toggle && navbar && githubIcon) {
        if (toggle.checked) {
            navbar.style.backgroundColor = lightMode["navbarColor"];
            githubIcon.style.filter = "brightness(0)";
            getTheme(lightMode);
        }
        else {
            navbar.style.backgroundColor = darkMode["navbarColor"];
            githubIcon.style.filter = "brightness(100%)";
            getTheme(darkMode);
        }
    }
}
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
        if (["slide-in-color", "proj-desc", "desc"].includes(source.classList[0])) {
            localRepoLink = localCtnrLink.children[1];
            localCtnrLink.style.boxShadow = "var(--proj-card-box-shadow)";
            localRepoLink.style.boxShadow = "unset";
        }
        else if (source.classList.value === "repo-span") {
            source.style.boxShadow = "var(--proj-card-box-shadow)";
        }
    }
    else {
        if (["slide-in-color", "proj-desc", "desc"].includes(source.classList[0])) {
            localCtnrLink.style.boxShadow = "unset";
            if (localCtnrLink.classList.length > 1) {
                localCtnrLink.classList.remove("focus-hover");
            }
        }
        else if (source.classList.value === "repo-span") {
            source.style.boxShadow = "unset";
        }
    }
};
const handleFocus = (event) => {
    const source = event.target;
    const parent = source.parentElement;
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
    }
    else {
        parent.style.boxShadow = "unset";
    }
};
const projCtnr = document.querySelector(".proj-ctnr");
const projCard = document.querySelectorAll(".proj-card");
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
const hiddenSections = document.querySelectorAll("section");
const topBtn = document.getElementById("top-btn-ctnr");
const homePage = document.getElementById("home");
const sectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            const targetFirstChild = entry.target.firstElementChild;
            const targetLastChild = entry.target.lastElementChild;
            if (targetFirstChild && targetLastChild) {
                targetFirstChild.classList.add("slide-down-header");
                if (targetLastChild.id !== "home-intro") {
                    targetLastChild.classList.add("show-delay");
                    observer.unobserve(entry.target);
                }
                else {
                    observer.unobserve(entry.target);
                }
            }
        }
    });
}, {
    threshold: 0.2,
});
const btnObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            topBtn.classList.add("slideIn");
            topBtn.classList.remove("slideOut");
        }
        else {
            topBtn.classList.add("slideOut");
            topBtn.classList.remove("slideIn");
        }
    });
}, {
    threshold: 0.2,
});
hiddenSections.forEach((sect) => sectObserver.observe(sect));
btnObserver.observe(homePage);
const internalLinks = document.querySelectorAll(".nav-link");
const topBtnLink = document.getElementById("top-btn-link");
[...internalLinks, topBtnLink].forEach((link) => {
    const anchor = document.querySelector(link.hash);
    link.addEventListener("click", (event) => {
        if (anchor) {
            anchor.scrollIntoView();
            event.preventDefault();
        }
    });
});
const boxCtnr = document.querySelector(".boxes-ctnr");
const fallSpeeds = ["super-slow", "slow", "normal", "fast", "super-fast"];
const boxSizes = ["small", "medium", "large"];
const makeBoxes = (numBoxes) => {
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
makeBoxes(40);
//# sourceMappingURL=script.js.map