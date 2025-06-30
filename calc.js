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
  document.querySelectorAll('.buttons button, .ans, .arrow-btn, .equal, .side-btn').forEach(btn => {
    if (btn.id !== 'power-btn') btn.disabled = disabled;
  });
  document.querySelectorAll('.arrow-pad .arrow-btn').forEach(btn => {
    btn.disabled = disabled;
  });
  document.querySelectorAll('.fraction .num, .fraction .den').forEach(span => {
    span.contentEditable = !disabled;
  });
}

function moveCursor(direction) {
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
  } else if (direction === 'up') {
    cursorPos = 0;
  } else if (direction === 'down') {
    cursorPos = currentInput.length;
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
  // If the cursor is on a square, delete it and insert the value
  if (currentInput[cursorPos] === '□') {
    currentInput = currentInput.slice(0, cursorPos) + value + currentInput.slice(cursorPos + 1);
    cursorPos += value.length;
  } else if (currentInput[cursorPos - 1] === '□') {
    // If the cursor is immediately after a square, replace the square and move the cursor
    currentInput = currentInput.slice(0, cursorPos - 1) + value + currentInput.slice(cursorPos);
    cursorPos = cursorPos - 1 + value.length;
  } else {
    // Insert value at cursor position
    currentInput = currentInput.slice(0, cursorPos) + value + currentInput.slice(cursorPos);
    cursorPos += value.length;
  }
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

function insertFraction() {
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
  // Insert plain text fraction at cursor position
  currentInput = currentInput.slice(0, cursorPos) + '□/□' + currentInput.slice(cursorPos);
  cursorPos += 1; // Place cursor before the first box
  renderDisplay();
}

// Update calculate to use extractFractions
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
    expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    expr = expr.replace(/□\/□/g, '(0/0)');
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