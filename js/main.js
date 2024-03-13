const switcherTheme = document.querySelectorAll(".switcher-svg");
const bottom = document.querySelector(".bottom");
const main = document.querySelector("main");
const numbers = document.querySelectorAll(".number");
let resultDisplay = document.querySelector(".result-span");
let allInput = document.querySelector(".num-all");
const items = document.querySelectorAll(".item");

let result = "0";
const allNumber = [];
let current = "";
let currentOperator = (op1, op2) => +op1 + +op2;

items.forEach((item) =>
  item.addEventListener("click", (event) => {
    keyPressed(event.target);
  })
);

switcherTheme[0].addEventListener("click", addSunTheme);
switcherTheme[1].addEventListener("click", addMoonTheme);

function addSunTheme() {
  main.className = "main light-theme";
}
function addMoonTheme() {
  main.className = "main dark-theme";
}

function keyPressed(key) {
  if (key.classList.contains("number")) {
    numberPressed(key);
  } else if (key.dataset.type) {
    currentOperator = operatorPressed(key.dataset.type);
  } else if (key.dataset.action) {
    actionPressed(key.dataset.action);
  }
}

function numberPressed(item) {
  let numValue = item.innerHTML;
  current += numValue;
  updateResult();
  if (allInput.innerHTML === "0") {
    currentOperator = (op1, op2) => +op1 + +op2;
    allInput.innerHTML = numValue;
  } else {
    allInput.innerHTML += numValue;
  }
}

function operatorPressed(type) {
  switch (type) {
    case "div":
      addOperator(`<i class="fa-solid fa-divide"></i>`);
      return (op1, op2) => op1 / op2;
    case "mult":
      addOperator(`<i class="fa fa-times" aria-hidden="true"></i>`);
      return (op1, op2) => op1 * op2;
    case "sub":
      addOperator(`<i class="fa fa-minus" aria-hidden="true"></i>`);
      return (op1, op2) => op1 - op2;
    case "add":
      addOperator(`<i class="fa fa-plus" aria-hidden="true"></i>`);
      return (op1, op2) => op1 + op2;
    case "equal":
      break;
  }
}

function actionPressed(action) {
  switch (action) {
    case "AC":
      resetToZero();
      break;
    case "percent":
      // addOperator(`<i class="fa fa-percent" aria-hidden="true"></i>`);
      break;
    case "remove-one":
      removeLastSymbol();
      break;
  }
}

function addOperator(stringNode) {
  if (isLastNode() || isDot()) {
    removeLastSymbol();
  }
  if (current) {
    allNumber.push(current);
    result = resultDisplay.innerHTML;
    current = "";
  }
  allInput.innerHTML += stringNode;
}

function removeLastSymbol() {
  if (isLastNode()) {
    allInput.lastChild.remove();
  } else {
    allInput.innerHTML = allInput.innerHTML.slice(0, -1);
  }
}

function isLastNode() {
  return allInput.innerHTML[allInput.innerHTML.length - 1] === ">";
}
function isDot() {
  return allInput.innerHTML[allInput.innerHTML.length - 1] === ".";
}

function resetToZero() {
  allInput.innerHTML = "";
  resultDisplay.innerHTML = "0";
  result = "0";
  current = "";
}

function updateResult() {
  resultDisplay.innerHTML = currentOperator(+result, +current);
}
