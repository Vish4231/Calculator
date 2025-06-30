const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const powerBtn = document.getElementById('power-btn');
let currentInput = '';
let isOn = false;
let greetingActive = false;
let warningActive = false;
let lastAnswer = '';
let cursorPos = 0;
let calcLeft = 50; // percent

function renderDisplay() {
  if (!isOn) {
    display.innerHTML = '';
    return;
  }
  if (greetingActive) {
    display.innerHTML = `<span class='greeting'>😃 Hello</span>`;
    return;
  }
  if (warningActive) {
    display.innerHTML = `<span class='warning'>⚠️ Turn ON the calculator!</span>`;
    return;
  }
  // Insert blinking cursor at cursorPos
  const left = currentInput.slice(0, cursorPos);
  const right = currentInput.slice(cursorPos);
  display.innerHTML =
    left.replace(/ /g, '&nbsp;') +
    "<span class='blinking-cursor'>|</span>" +
    right.replace(/ /g, '&nbsp;');
}

function setCalculatorPower(state) {
  isOn = state;
  if (isOn) {
    calculator.classList.add('on');
    calculator.classList.remove('off');
    showGreeting('😃 Hello');
    setButtonsDisabled(false);
    renderDisplay();
  } else {
    calculator.classList.remove('on');
    calculator.classList.add('off');
    greetingActive = false;
    warningActive = false;
    setButtonsDisabled(true);
    renderDisplay();
  }
}

function showGreeting(msg) {
  greetingActive = true;
  warningActive = false;
  display.innerHTML = `<span class='greeting'>${msg}</span>`;
  renderDisplay();
}

function showWarning(msg) {
  warningActive = true;
  greetingActive = false;
  display.innerHTML = `<span class='warning'>${msg}</span>`;
  renderDisplay();
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.buttons button, .ans, .arrow-btn').forEach(btn => {
    if (btn.id !== 'power-btn') btn.disabled = disabled;
  });
}

function moveCalculator(direction) {
  // Now moves the cursor instead of the calculator
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  if (direction === 'left') {
    if (cursorPos > 0) cursorPos--;
  } else if (direction === 'right') {
    if (cursorPos < currentInput.length) cursorPos++;
  }
  renderDisplay();
}

function appendToDisplay(value) {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  // Insert value at cursor position
  currentInput = currentInput.slice(0, cursorPos) + value + currentInput.slice(cursorPos);
  cursorPos += value.length;
  renderDisplay();
}

function clearDisplay() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  currentInput = '';
  cursorPos = 0;
  renderDisplay();
}

function appendAns() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  currentInput = currentInput.slice(0, cursorPos) + 'Ans' + currentInput.slice(cursorPos);
  cursorPos += 3;
  renderDisplay();
}

function calculate() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  try {
    let expr = currentInput.replace(/Ans/g, lastAnswer);
    expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    expr = expr.replace(/√(-?\d+(?:\.\d+)?)/g, 'Math.sqrt($1)');
    let result = eval(expr);
    if (result === undefined) result = 0;
    display.innerHTML = result;
    currentInput = result.toString();
    cursorPos = currentInput.length;
    lastAnswer = result;
  } catch (e) {
    display.innerHTML = 'Error';
    currentInput = '';
    cursorPos = 0;
  }
  renderDisplay();
}

// Initialize power state on load
setCalculatorPower(false);
renderDisplay();

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
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
  }
  currentInput = '';
  cursorPos = 0;
  renderDisplay();
}

function moveCalculator(direction) {
  if (direction === 'left') {
    calcLeft -= 5;
  } else if (direction === 'right') {
    calcLeft += 5;
  }
  if (calcLeft < 0) calcLeft = 0;
  if (calcLeft > 100) calcLeft = 100;
  calculator.style.left = calcLeft + '%';
}

function appendAns() {
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
  currentInput += 'Ans';
  display.textContent = currentInput;
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
    expr = expr.replace(/Ans/g, lastAnswer);
    expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
    expr = expr.replace(/√(-?\d+(?:\.\d+)?)/g, 'Math.sqrt($1)');
    let result = eval(expr);
    if (result === undefined) result = 0;
    display.textContent = result;
    currentInput = result.toString();
    lastAnswer = result;
  } catch (e) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

function deleteAtCursor() {
  if (!isOn) {
    showWarning('⚠️ Turn ON the calculator!');
    return;
  }
  if (greetingActive || warningActive) {
    greetingActive = false;
    warningActive = false;
    currentInput = '';
    cursorPos = 0;
    renderDisplay();
    return;
  }
  if (cursorPos > 0) {
    currentInput = currentInput.slice(0, cursorPos - 1) + currentInput.slice(cursorPos);
    cursorPos--;
    renderDisplay();
  }
} 