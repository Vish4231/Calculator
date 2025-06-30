const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const powerBtn = document.getElementById('power-btn');
let currentInput = '';
let isOn = true;
let greetingActive = false;

function setCalculatorPower(state) {
  isOn = state;
  if (isOn) {
    calculator.classList.add('on');
    calculator.classList.remove('off');
    showGreeting('🙂 Hello');
    setButtonsDisabled(false);
  } else {
    calculator.classList.remove('on');
    calculator.classList.add('off');
    showGreeting('😐 Bye');
    setButtonsDisabled(true);
  }
}

function showGreeting(msg) {
  display.textContent = msg;
  display.classList.add('greeting');
  greetingActive = true;
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
  if (greetingActive) {
    display.classList.remove('greeting');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
  }
  if (display.textContent === '0' && value !== '.') {
    currentInput = '';
  }
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  if (!isOn) return;
  if (greetingActive) {
    display.classList.remove('greeting');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
  }
  currentInput = '';
  display.textContent = '0';
}

function calculate() {
  if (!isOn) return;
  if (greetingActive) {
    display.classList.remove('greeting');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
  }
  try {
    let expr = currentInput;
    expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
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