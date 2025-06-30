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
    // Evaluate the expression safely
    let result = eval(currentInput.replace(/[^-+*/().\d]/g, ''));
    if (result === undefined) result = 0;
    display.textContent = result;
    currentInput = result.toString();
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
  }
} 