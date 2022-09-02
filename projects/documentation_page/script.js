const navGroup = document.querySelector(".nav-group");

const navLinks = [
  "Introduction", "What you should already know", "JavaScript and Java",
  "Hello world", "Variables", "Declaring variables", "Variable scope",
  "Global variables", "Constants", "Data types", "if else statement",
  "while statement", "Function declarations", "Reference"
];

const createNavGroup = (inp) => {
  for (let i = 0; i < inp.length; i++) {
    const elem = document.createElement("a");
    navGroup.appendChild(elem).className = "nav-link";
    navGroup.appendChild(elem).href = `#${inp[i].replace(/\s/g, "_")}`;
    navGroup.appendChild(elem).innerHTML = inp[i];
  }
}

createNavGroup(navLinks);