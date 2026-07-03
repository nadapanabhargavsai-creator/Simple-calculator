let current    = '';
let expression = '';
let justCalc   = false;
 
const resultEl = document.getElementById('result');
const exprEl   = document.getElementById('expr');
 
const API_URL = 'https://simple-calculator-production-f740.up.railway.app/api/calculate';
 
/* ── Helpers ── */
function isOp(ch) {
  return ['+', '-', '*', '/', '%'].includes(ch);
}
 
function updateDisplay() {
  resultEl.textContent = current === '' ? '0' : current;
  const pretty = expression.replace(/\*/g, '×').replace(/\//g, '÷');
  exprEl.textContent = pretty;
}
 
/* ── Input handlers ── */
function inputNum(n) {
  if (justCalc) { current = ''; expression = ''; justCalc = false; }
  if (current.length >= 12) return;
  current    += n;
  expression += n;
  updateDisplay();
}
 
function inputDot() {
  if (justCalc) { current = '0'; expression = '0'; justCalc = false; }
  const parts = expression.split(/[\+\-\*\/]/);
  const last  = parts[parts.length - 1];
  if (last.includes('.')) return;
  if (current === '' || isOp(current[current.length - 1])) {
    current    += '0';
    expression += '0';
  }
  current    += '.';
  expression += '.';
  updateDisplay();
}
 
function inputOp(op) {
  justCalc = false;
  if (current === '' && expression === '') return;
  if (isOp(expression[expression.length - 1])) {
    expression = expression.slice(0, -1) + op;
    current    = current.slice(0, -1)    + op;
  } else {
    expression += op;
    current    += op;
  }
  updateDisplay();
}
 
function clearAll() {
  current = ''; expression = ''; justCalc = false;
  updateDisplay();
}
 
function deleteLast() {
  if (justCalc) { clearAll(); return; }
  current    = current.slice(0, -1);
  expression = expression.slice(0, -1);
  updateDisplay();
}
 
/* ── Calculate — calls Java backend ── */
async function calculate() {
  if (expression === '') return;
 
  // Parse expression: split on last operator
  const match = expression.match(/^([\d.]+)([\+\-\*\/%])([\d.]+)$/);
 
  if (!match) {
    resultEl.textContent = 'Error';
    current = ''; expression = ''; justCalc = true;
    return;
  }
 
  const num1     = parseFloat(match[1]);
  const operator = match[2];
  const num2     = parseFloat(match[3]);
 
  try {
    resultEl.textContent = '...';
 
    const response = await fetch(API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ num1, num2, operator })
    });
 
    const data = await response.json();
 
    if (data.error) {
      resultEl.textContent = data.error;
      current = ''; expression = ''; justCalc = true;
      return;
    }
 
    const res = parseFloat(data.result.toFixed(10));
 
    exprEl.textContent   = expression.replace(/\*/g, '×').replace(/\//g, '÷') + ' =';
    resultEl.textContent = res;
    current    = String(res);
    expression = String(res);
    justCalc   = true;
 
  } catch (err) {
    resultEl.textContent = 'Server Error';
    current = ''; expression = ''; justCalc = true;
  }
}
 
/* ── Keyboard support ── */
document.addEventListener('keydown', e => {
  if ('0123456789'.includes(e.key))               inputNum(e.key);
  else if (e.key === '.')                          inputDot();
  else if (['+','-','*','/','%'].includes(e.key)) inputOp(e.key);
  else if (e.key === 'Enter' || e.key === '=')    calculate();
  else if (e.key === 'Backspace')                 deleteLast();
  else if (e.key === 'Escape')                    clearAll();
});