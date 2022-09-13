const calcInputs = new Map([
  [0, "Del"], [1, "^"], [2, "("], [3, ")"], [4, "+"],
  [5, "e"], [6, "7"], [7, "8"], [8, "9"], [9, "-"],
  [10, "π"], [11, "4"], [12, "5"], [13, "6"], [14, "x"],
  [15, "|a|"], [16, "1"], [17, "2"], [18, "3"], [19, "/"],
  [20, "ans"], [21, "0"], [22, "."], [23, "CE"], [24, "="]
]);

const calcButtons = document.getElementById("calc-buttons");
const numInput = document.getElementById("calc-input");
const numOutput = document.getElementById("calc-output");

/* Main Grid for Calculator Buttons */
const makeGrid = (rows, cols) => {
  calcButtons.style.setProperty("--grid-rows", rows);
  calcButtons.style.setProperty("--grid-cols", cols);
  for (let i = 0; i < rows * cols; i++) {
    const buttons = document.createElement("div");
    buttons.innerText = calcInputs.get(i);
    calcButtons.appendChild(buttons).className = "grid-buttons";
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
  if (numInput.innerHTML === "0") {
    switch (true) {
      case ([...symbols].includes(inp)):
        numInput.innerHTML += inp;
        break;
      case ([...calcFuncs].includes(inp)):
        initializeNums();
        break;
      case ([...absFunc].includes(inp)):
        numInput.innerHTML = "abs(";
        break;
      default:
        numInput.innerHTML = inp;
        break;
    }
  } else {
    if ([...symbols].includes(numInput.innerHTML.slice(-1))) {
      switch (inp) {
        case "CE":
          initializeNums();
          break;
        case "Del":
          delFunc(numInput.innerHTML);
          break;
        case "=":
          if (inp === ")") {
            displayOutput(numInput.innerHTML);
            break;
          } else {
            break;
          }
        case "|a|":
          numInput.innerHTML += "abs(";
          break;
        default:
          if ([...symbols].includes(inp)) {
            if ((numInput.innerHTML.search(/a/g) !== -1) && (numInput.innerHTML.slice(-1) === ")")) {
              numInput.innerHTML += inp;
              break;
            } else {
              numInput.innerHTML = numInput.innerHTML.slice(0, numInput.innerHTML.length - 1) + inp;
              break;
            }
          } else {
            numInput.innerHTML += inp;
            break;
          }
      }
    } else {
      switch (inp) {
        case "CE":
          initializeNums();
          break;
        case "Del":
          delFunc(numInput.innerHTML);
          break;
        case "=":
          displayOutput(numInput.innerHTML);
          break;
        case "|a|":
          numInput.innerHTML += "abs(";
          break;
        case "ans":
          numInput.innerHTML = numOutput.innerHTML;
          break;
        default:
          numInput.innerHTML += inp;
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
    numOutput.innerHTML = (result).toExponential(7);
  } else {
    numOutput.innerHTML = result;
  }
};

const delFunc = (displayedInp) => {
  if (displayedInp.length === 1) {
    numInput.innerHTML = "0";
  } else {
    numInput.innerHTML = displayedInp.slice(0, displayedInp.length - 1);
  }
};

const initializeNums = () => {
  numInput.innerHTML = "0";
  numOutput.innerHTML = "0";
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

const moveCalcBtn = document.getElementById("move-calc-btn");

moveCalcBtn.addEventListener("click", () => {
  if (moveCalcBtn.innerHTML === "Move Calculator Left") {
    moveCalcBtn.innerHTML = "Move Calculator Right";
    document.body.style.flexDirection = "row";
  } else {
    moveCalcBtn.innerHTML = "Move Calculator Left";
    document.body.style.flexDirection = "row-reverse";
  }
});