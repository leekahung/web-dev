/* Setting window height for calculator */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); 
})

/* Initializing const for calculator inputs and outputs */
const calcInputs = new Map([
  [0, "Del"], [1, "^"], [2, "("], [3, ")"], [4, "+"],
  [5, "e"], [6, "7"], [7, "8"], [8, "9"], [9, "-"],
  [10, "π"], [11, "4"], [12, "5"], [13, "6"], [14, "x"],
  [15, "|a|"], [16, "1"], [17, "2"], [18, "3"], [19, "/"],
  [20, "ans"], [21, "0"], [22, "."], [23, "CE"], [24, "="]
]);

const calcButtons = document.getElementById("calc-grp__btns");
const numInput = document.getElementById("calc-grp__display__input");
const numOutput = document.getElementById("calc-grp__display__output");

/* Main Grid for Calculator Buttons */
const makeGrid = (rows, cols) => {
  calcButtons.style.setProperty("--grid-rows", rows);
  calcButtons.style.setProperty("--grid-cols", cols);
  for (let i = 0; i < rows * cols; i++) {
    const buttons = document.createElement("div");
    buttons.innerText = calcInputs.get(i);
    calcButtons.appendChild(buttons).className = "calc-grp__grid-btns";
    calcButtons.appendChild(buttons).style.cursor = "pointer";
    switch (calcInputs.get(i)) {
      case "CE":
        specBtnListener(calcButtons.appendChild(buttons), "CE");
        break;
      case "=":
        specBtnListener(calcButtons.appendChild(buttons), "=");
        break;
    }
    calcButtons.appendChild(buttons).onclick = function () {
      checkOperations(i, "click");
    };
  }
};

/* Helper functions for styling, event listening, and button operations */
const specBtnListener = (elem, inp) => {
  const opacVals = ["0.5", "0.6", " 0.3", "0.5"];
  const colorSchemeColor = ["200, 0, 0", "255, 127, 0"];
  const eventTypes = ["mouseover", "mouseout", "mousedown", "mouseup"];
  const addEvents = (colorInp) => {
    elem.style.backgroundColor = `rgba(${colorInp},${opacVals[1]})`;
    for (let i = 0; i < eventTypes.length; i++) {
      elem.addEventListener(eventTypes[i], (event) => {
        event.target.style.backgroundColor = `rgba(${colorInp},${opacVals[i]})`;
      });
    };
  };

  if (inp === "CE") {
    addEvents(colorSchemeColor[0]);
  } else if (inp === "=") {
    addEvents(colorSchemeColor[1]);
  }
};

/* Main Operations Function */
const checkOperations = (index, inpType) => {
  const symbols = ["+", "-", "/", "x", ".", "^"];
  const absFunc = ["|a|"];
  const calcFuncs = ["Del", "CE", "=", "ans"];
  let inp;
  if (inpType == "click") {
    inp = calcInputs.get(index);
  } else {
    inp = index;
  }
  if (numInput.innerText === "0") {
    switch (true) {
      case ([...symbols].includes(inp)):
        numInput.innerText += inp;
        break;
      case ([...calcFuncs].includes(inp)):
        initializeNums();
        break;
      case ([...absFunc].includes(inp)):
        numInput.innerText = "abs(";
        break;
      default:
        numInput.innerText = inp;
        break;
    }
  } else {
    if ([...symbols].includes(numInput.innerText.slice(-1))) {
      switch (inp) {
        case "CE":
          initializeNums();
          break;
        case "Del":
          delFunc(numInput.innerText);
          break;
        case "=":
          if (inp === ")") {
            displayOutput(numInput.innerText);
            break;
          } else {
            break;
          }
        case "|a|":
          numInput.innerText += "abs(";
          break;
        default:
          if ([...symbols].includes(inp)) {
            if ((numInput.innerText.search(/a/g) !== -1) && (numInput.innerText.slice(-1) === ")")) {
              numInput.innerText += inp;
              break;
            } else {
              numInput.innerText = numInput.innerText.slice(0, numInput.innerText.length - 1) + inp;
              break;
            }
          } else {
            numInput.innerText += inp;
            break;
          }
      }
    } else {
      switch (inp) {
        case "CE":
          initializeNums();
          break;
        case "Del":
          delFunc(numInput.innerText);
          break;
        case "=":
          displayOutput(numInput.innerText);
          break;
        case "|a|":
          numInput.innerText += "abs(";
          break;
        case "ans":
          numInput.innerText = numOutput.innerText;
          break;
        default:
          numInput.innerText += inp;
          break;
      }
    }
  }
};

/* Secondary Operations Functions */
const displayOutput = (displayedInp) => {
  if ((displayedInp.search(/[\(\)]/) !== -1) &&
    (displayedInp.match(/\(/g).length !== displayedInp.match(/\)/g).length)) {
    return;
  }

  displayedInp = displayedInp.replace(/x/g, "*").replace(/\^/g, "**").replace(/\π/g, "Math.PI").replace(/e/g, "Math.E");
  if (displayedInp.search(/a/g) !== -1) {
    displayedInp = displayedInp.replace(/abs/g, "Math.abs");
  }

  const result = Math.round(10 ** 14 * Function("return " + displayedInp)()) / (10 ** 14);
  if (result > 10 ** 14) {
    numOutput.innerText = (result).toExponential(7);
  } else {
    numOutput.innerText = result;
  }
};

const delFunc = (displayedInp) => {
  if (displayedInp.length === 1) {
    numInput.innerText = "0";
  } else {
    numInput.innerText = displayedInp.slice(0, displayedInp.length - 1);
  }
};

const initializeNums = () => {
  numInput.innerText = "0";
  numOutput.innerText = "0";
};

makeGrid(5, 5);
initializeNums();

/* Keyboard Listener */
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "+":
    case "-":
    case "/":
    case "(":
    case ")":
    case "^":
    case ".":
      checkOperations(event.key, "keyboard");
      break;
    case "x":
    case "*":
      checkOperations("x", "keyboard");
      break;
    case "Backspace":
      if (event.shiftKey === false) {
        checkOperations("Del", "keyboard");
        break;
      } else {
        checkOperations("CE", "keyboard");
        break;
      }
    case "=":
    case "Enter":
      checkOperations("=", "keyboard");
      break;
    case "e":
      checkOperations("e", "keyboard");
      break;
    case "a":
      checkOperations("|a|", "keyboard");
      break;
    case "p":
      checkOperations("π", "keyboard");
      break;
    default:
      break;
  }
});

const moveCalcBtn = document.getElementById("bottom-grp__move-calc-btn");

moveCalcBtn.addEventListener("click", () => {
  if (moveCalcBtn.innerText === "Move Calculator Left") {
    moveCalcBtn.innerText = "Move Calculator Right";
    document.body.style.flexDirection = "row";
  } else {
    moveCalcBtn.innerText = "Move Calculator Left";
    document.body.style.flexDirection = "row-reverse";
  }
});