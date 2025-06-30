const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const powerBtn = document.getElementById('power-btn');
let currentInput = '';
let isOn = false;
let greetingActive = false;
let warningActive = false;

function setCalculatorPower(state) {
  isOn = state;
  if (isOn) {
    calculator.classList.add('on');
    calculator.classList.remove('off');
    showGreeting('😃 Hello');
    setButtonsDisabled(false);
  } else {
    calculator.classList.remove('on');
    calculator.classList.add('off');
    display.textContent = '';
    display.classList.remove('greeting', 'warning');
    greetingActive = false;
    warningActive = false;
    setButtonsDisabled(true);
  }
}

function showGreeting(msg) {
  display.textContent = msg;
  display.classList.add('greeting');
  display.classList.remove('warning');
  greetingActive = true;
  warningActive = false;
}

function showWarning(msg) {
  display.textContent = msg;
  display.classList.add('warning');
  display.classList.remove('greeting');
  warningActive = true;
  greetingActive = false;
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
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    display.classList.remove('greeting', 'warning');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
    warningActive = false;
  }
  if (display.textContent === '0' && value !== '.') {
    currentInput = '';
  }
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    display.classList.remove('greeting', 'warning');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
    warningActive = false;
  }
  currentInput = '';
  display.textContent = '0';
}

function calculate() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    display.classList.remove('greeting', 'warning');
    display.textContent = '';
    currentInput = '';
    greetingActive = false;
    warningActive = false;
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
setCalculatorPower(false); 