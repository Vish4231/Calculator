const display = document.getElementById('display');
const smileMessage = document.getElementById('smile-message');
const calculator = document.querySelector('.calculator');
const powerBtn = document.getElementById('power-btn');
let currentInput = '';
let isOn = true;

function setCalculatorPower(state) {
  isOn = state;
  if (isOn) {
    calculator.classList.add('on');
    calculator.classList.remove('off');
    smileMessage.textContent = '🙂 Hello';
    display.textContent = currentInput || '0';
    setButtonsDisabled(false);
  } else {
    calculator.classList.remove('on');
    calculator.classList.add('off');
    smileMessage.textContent = '😐 Bye';
    display.textContent = '';
    setButtonsDisabled(true);
  }
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.buttons button').forEach(btn => {
    if (btn.id !== 'power-btn') btn.disabled = disabled;
  });
}

function togglePower() {
  setCalculatorPower(!isOn);
}

function appendToDisplay(value) {
  if (!isOn) return;
  if (display.textContent === '0' && value !== '.') {
    currentInput = '';
  }
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  if (!isOn) return;
  currentInput = '';
  display.textContent = '0';
}

function calculate() {
  if (!isOn) return;
  try {
    let expr = currentInput;
    // Replace all √(expression) with Math.sqrt(expression)
    expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    // Replace all √number (including negative and decimal)
    expr = expr.replace(/√(-?\d+(?:\.\d+)?)/g, 'Math.sqrt($1)');
    let result = eval(expr);
    if (result === undefined) result = 0;
    display.textContent = result;
    currentInput = result.toString();
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

// Initialize power state on load
setCalculatorPower(true); 