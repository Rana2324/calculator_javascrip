const previousOperantElement = document.querySelector(".display1");
const currentsOperantElement = document.querySelector(".display2");
const acButton = document.querySelector("#ac");
const delButton = document.querySelector("#del");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const equalButton = document.querySelector("#equal");

let previousOperant = "";
let currentOperant = "";
let operation = "";

acButton.addEventListener("click", function (e) {
  previousOperant = "";
  currentOperant = "";
  operation = "";
  updateDisplay();
});
delButton.addEventListener("click", function (e) {
  currentOperant = currentOperant.slice(0, -1);
  updateDisplay();
});

function formateOutput(num) {
  const result = Number(num).toLocaleString("en");

  if (result !== "0") {
    return result;
  } else {
    return "";
  }
}
function updateDisplay() {
  currentsOperantElement.innerHTML = formateOutput(currentOperant);
  previousOperantElement.innerHTML = `${formateOutput(
    previousOperant
  )} ${operation}`;
}

function appendNumber(number) {
  currentOperant += number;
}
function choseOperator(operator) {
  if (previousOperant) {
    previousOperant = calculation();
  } else {
    previousOperant = currentOperant;
  }
  operation = operator;
  currentOperant = "";
}
function calculation() {
  switch (operation) {
    case "/":
      return Number(previousOperant) / Number(currentOperant);
      break;
    case "+":
      return Number(previousOperant) + Number(currentOperant);
      break;
    case "-":
      return Number(previousOperant) - Number(currentOperant);
      break;
    case "*":
      return Number(previousOperant) * Number(currentOperant);
      break;
  }
}

equalButton.addEventListener("click", function (e) {
  if (!previousOperant) return;
  if (currentOperant) {
    currentOperant = calculation();
  } else {
    currentOperant = previousOperant;
  }

  previousOperant = "";
  operation = "";
  updateDisplay();
});
numberButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.value === "." && currentOperant.includes(".")) return;
    appendNumber(btn.value);
    updateDisplay();
  });
});
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!currentOperant) return;
    choseOperator(btn.value);
    updateDisplay();
  });
});
