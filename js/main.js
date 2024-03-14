const switcherTheme = document.querySelectorAll(".switcher-svg");
const bottom = document.querySelector(".bottom");
const main = document.querySelector("main");
const numbersBtn = document.querySelectorAll(".number");
let resultDisplay = document.querySelector(".result-span");
let allInput = document.querySelector(".num-all");
const items = document.querySelectorAll(".item");

switcherTheme[0].addEventListener("click", addSunTheme);
switcherTheme[1].addEventListener("click", addMoonTheme);

function addSunTheme() {
  main.className = "main light-theme";
}
function addMoonTheme() {
  main.className = "main dark-theme";
}

let result = "0";
const numbers = [];
const operators = [];

let current = "";
let currentOperator = (op1, op2) => +op1 + +op2;

items.forEach((item) =>
  item.addEventListener("click", (event) => {
    keyPressed(event.target);
  })
);

function keyPressed(key) {
  if (key.classList.contains("number")) {
    numberPressed(key);
  } else if (key.dataset.type) {
    currentOperator = getCurrentOperation(key.dataset.type);
    operatorPressed(key.dataset.type);
  } else if (key.dataset.action) {
    actionPressed(key.dataset.action);
  }
}

function numberPressed(item) {
  numbers.pop();

  let numValue = item.innerHTML;
  if (current.length > 12) {
    numbers.push(current);
    return;
  }
  current += numValue;
  numbers.push(current);
  updateResult();
  if (allInput.innerHTML === "") {
    allInput.innerHTML = numValue;
  } else {
    allInput.innerHTML += numValue;
  }
}

function operatorPressed(type) {
  switch (type) {
    case "div":
      addOperator(`<i class="fa-solid fa-divide"></i>`, type);
      break;
    case "mult":
      addOperator(`<i class="fa fa-times" aria-hidden="true"></i>`, type);
      break;
    case "sub":
      addOperator(`<i class="fa fa-minus" aria-hidden="true"></i>`, type);
      break;
    case "add":
      addOperator(`<i class="fa fa-plus" aria-hidden="true"></i>`, type);
      break;
  }
}

function getCurrentOperation(type) {
  switch (type) {
    case "div":
      return (op1, op2) => op1 / op2;
    case "mult":
      return (op1, op2) => op1 * op2;
    case "sub":
      return (op1, op2) => op1 - op2;
    case "add":
      return (op1, op2) => op1 + op2;
  }
}

function actionPressed(action) {
  switch (action) {
    case "AC":
      resetToZero();
      break;
    case "percent":
      if (current == "") {
        break;
      }
      numbers.pop();
      allInput.innerHTML = allInput.innerHTML.slice(0, -current.length);
      current = String(+current / 100);
      numbers.push(current);
      allInput.innerHTML += current;
      updateResult();
      break;
    case "remove-one":
      removeLastSymbol();
      break;
    case "equal":
      break;
  }
}

function addOperator(stringNode, type) {
  if (isLastNode() || isDot()) {
    removeLastSymbol();
  }
  operators.push(type);
  current = "";
  numbers.push(current);
  allInput.innerHTML += stringNode;
}

function removeLastSymbol() {
  if (isLastNode()) {
    allInput.lastChild.remove();
    operators.pop();
    current = numbers.pop();
  } else {
    numbers.pop();
    allInput.innerHTML = allInput.innerHTML.slice(0, -1);
    current = current.slice(0, -1);
    numbers.push(current);
    console.log(numbers, operators);
  }
  updateResult();
}

function isLastNode() {
  return allInput.innerHTML[allInput.innerHTML.length - 1] === ">";
}
function isDot() {
  return allInput.innerHTML[allInput.innerHTML.length - 1] === ".";
}

function isNumbersArrayEmpty() {
  return numbers.length == 0;
}

function resetToZero() {
  allInput.innerHTML = "";
  resultDisplay.innerHTML = "0";
  result = "0";
  current = "";
  numbers.length = 0;
  operators.length = 0;
}

function updateResult() {
  resultDisplay.innerHTML = calculateResult(
    numbers.slice(0).reverse(),
    operators.slice(0).reverse()
  );
}

function calculateResult(calcNumbers, calcOperators) {
  let operatorCurrent;
  let operand1;
  let operand2;
  while (calcOperators.length) {
    operand1 = calcNumbers.pop();
    operand2 = calcNumbers.pop();
    if (operand2 == "") {
      calcNumbers.push(operand1);
      calcOperators.pop();
    } else {
      operatorCurrent = getCurrentOperation(calcOperators.pop());
      calcNumbers.push(operatorCurrent(+operand1, +operand2));
    }
  }

  return +calcNumbers.pop().toFixed(9);
}
