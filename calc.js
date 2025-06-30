const display = document.getElementById('display');
let currentInput = '';

function appendToDisplay(value) {
  if (display.textContent === '0' && value !== '.') {
    currentInput = '';
  }
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.textContent = '0';
}

function calculate() {
  try {
    let expr = currentInput.replace(/[^-+*/().\d√]/g, '');
    // Replace all √(expression) with Math.sqrt(expression)
    expr = expr.replace(/√\(/g, 'Math.sqrt(');
    let result = eval(expr);
    if (result === undefined) result = 0;
    display.textContent = result;
    currentInput = result.toString();
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
  }
} 