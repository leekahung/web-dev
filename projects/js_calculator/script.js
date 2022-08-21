const calcInputs = new Map([
  [0, "Del"], [ 1, "^"],  [2, "("],   [3, ")"],  [4, "+"], 
    [5, "e"],  [6, "7"],  [7, "8"],   [8, "9"],  [9, "-"],
   [10, "π"], [11, "4"], [12, "5"],  [13, "6"], [14, "x"],
 [15, "|a|"], [16, "1"], [17, "2"],  [18, "3"], [19, "/"],
 [20, "ans"], [21, "0"], [22, "."], [23, "CE"], [24, "="]
]);

const calcButtons = document.getElementById("calc-buttons");
const numInput = document.getElementById("calc-input");
const numOutput = document.getElementById("calc-output");

function makeGrid(rows, cols) {
  calcButtons.style.setProperty("--grid-rows", rows);
  calcButtons.style.setProperty("--grid-cols", cols);
  for (let i = 0; i < rows * cols; i++) {
    const buttons = document.createElement("div");
    buttons.innerText = calcInputs.get(i);
    calcButtons.appendChild(buttons).className = "grid-buttons";
    calcButtons.appendChild(buttons).style.cursor = "pointer";
    if (calcInputs.get(i) === "CE") {
      calcButtons.appendChild(buttons).style.backgroundColor = "rgba(200, 0, 0, 0.6)";
      calcButtons.appendChild(buttons).addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "rgba(200, 0, 0, 0.5)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mouseout", (event) => {
        event.target.style.backgroundColor = "rgba(200, 0, 0, 0.6)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mousedown", (event) => {
        event.target.style.backgroundColor = "rgba(200, 0, 0, 0.3)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mouseup", (event) => {
        event.target.style.backgroundColor = "rgb(200, 0, 0, 0.5)", true
      });
    } else if (calcInputs.get(i) === "=") {
      calcButtons.appendChild(buttons).style.backgroundColor = "rgba(255, 127, 0, 0.6)";
      calcButtons.appendChild(buttons).addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "rgba(255, 127, 0, 0.5)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mouseout", (event) => {
        event.target.style.backgroundColor = "rgba(255, 127, 0, 0.6)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mousedown", (event) => {
        event.target.style.backgroundColor = "rgba(255, 127, 0, 0.3)", true
      });
      calcButtons.appendChild(buttons).addEventListener("mouseup", (event) => {
        event.target.style.backgroundColor = "rgb(255, 127, 0, 0.5)", true
      });
    }
    calcButtons.appendChild(buttons).onclick = function() {
      let displayed = numInput.innerHTML;
      checkOperations(displayed, i);
    };
  }
}

makeGrid(5, 5);

function checkOperations(rawInput, index) {
  const symbols = ["+", "-", "/", "x", ".", "^"];
  if (calcInputs.get(index) === "CE") {
    numInput.innerHTML = "0";
    numOutput.innerHTML = "0";
  /* Deletion rules*/
  } else if (calcInputs.get(index) === "Del" && rawInput.length > 1) {
    numInput.innerHTML = rawInput.slice(0, rawInput.length - 1);
  } else if (calcInputs.get(index) === "Del" && rawInput.length == 1) {
    numInput.innerHTML = "0";
  /* Duplicate rules for symbols */
  } else if ([...symbols].includes(calcInputs.get(index)) && ["0", "."].includes(rawInput)) {
    numInput.innerHTML += calcInputs.get(index);
  } else if (symbols.includes(calcInputs.get(index)) && symbols.includes(rawInput.slice(-1))) {
    numInput.innerHTML = rawInput.slice(0, rawInput.length - 1) + calcInputs.get(index);
  /* Output rules, conversions & workaround for floating point error */
  } else if (calcInputs.get(index) === "=") {
    rawInput = rawInput.replace(/x/g, "*").replace(/\^/g, "**")
                       .replace(/\π/g, "Math.PI").replace(/e/g, "Math.E");
    if (rawInput.search(/a/g) !== -1) {
      rawInput = rawInput.replace("abs", "Math.abs");
    }
    let result = Math.round(10**14 * Function("return " + rawInput)()) / (10**14);
    if (result > 10**14) {
      numOutput.innerHTML = (result).toExponential();
    } else {
      numOutput.innerHTML = result;
    }
  /* Rules for absolute value */
  } else if (calcInputs.get(index) === "|a|" && rawInput === "0") {
    numInput.innerHTML = "abs("
  } else if (calcInputs.get(index) === "|a|") {
    numInput.innerHTML += "abs("
  /* Default rules for storing numbers in "ans" and displayed Input */
  } else if (calcInputs.get(index) === "ans") {
    numInput.innerHTML = numOutput.innerHTML;
  } else if (rawInput === "0") {
    numInput.innerHTML = calcInputs.get(index);
  } else {
    numInput.innerHTML += calcInputs.get(index);
  }
}

function initializeNums() {
  numInput.innerHTML = "0";
  numOutput.innerHTML = "0";
};

initializeNums();