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
    // Replace all √( with Math.sqrt(
    let expr = currentInput.replace(/√\(/g, 'Math.sqrt(');
    // Remove any characters except numbers, operators, parentheses, dot, and letters (for Math.sqrt)
    expr = expr.replace(/[^-+*/().\dA-Za-z]/g, '');
    let result = eval(expr);
    if (result === undefined) result = 0;
    display.textContent = result;
    currentInput = result.toString();
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
  }
} 