let currentInput = '';
let operator = null;
let previousInput = '';

const display = document.getElementById('display');

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function chooseOperation(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    compute();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentInput = computation;
  operator = null;
  previousInput = '';
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  operator = null;
  previousInput = '';
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
}
