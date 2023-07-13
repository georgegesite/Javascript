let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = '';
let memory = 0;

function evaluateMathExpression(mathExpression) {
    return new Function('return ' + mathExpression)();
}

for (let item of buttons) {
    item.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        console.log('Button text is ', buttonText);
        if (buttonText == 'X') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            screen.value = evaluateMathExpression(screenValue);
            memory = evaluateMathExpression(screenValue);
        }
        else if (buttonText == 'mc') {
            memory = 0;
        }
        else if (buttonText == 'mr') {
            screen.value = memory;
            screenValue = memory.toString();
        }
        else if (buttonText == 'm-') {
            memory -= parseFloat(screenValue);
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == 'm+') {
            memory += parseFloat(screenValue);
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == 'ms') {
            memory += parseFloat(screenValue);
            screenValue = "";
            screen.value = screenValue;
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}


function calculate(str) {
    str = str.replace(/\s/g, ''); // Remove whitespace
    let result = evaluate(str);
    return result;
  }
  
  function evaluate(str) {
    str = str.replace(/\s/g, ''); // Remove whitespace
    let numArr = str.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g).map(val => parseFloat(val));
  
    let operators = str.match(/[+\-*/]/g);
    let opOrder = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
  
    // Evaluate parentheses first
    let parenRegex = /\(([^()]*)\)/;
    while (parenRegex.test(str)) {
      let subStr = str.match(parenRegex)[1];
      let subResult = evaluate(subStr);
      str = str.replace(parenRegex, subResult);
    }
  
    // Evaluate remaining expression following order of operations
    for (let op of ['*', '/', '+', '-']) {
      while (operators.includes(op)) {
        let index = operators.findIndex((val) => val === op);
        let num1 = numArr[index];
        let num2 = numArr[index+1];
        let operator = operators[index];
  
        if (opOrder[operator] === opOrder[op]) {
          numArr.splice(index, 2, num1 + (operator === '-' ? -num2 : num2));
          operators.splice(index, 1);
        }
        else if (opOrder[operator] > opOrder[op]) {
          let result = performOperation(num1, num2, operator);
          numArr.splice(index, 2, result);
          operators.splice(index, 1);
        }
        else {
          // Skip lower-precedence operators
          continue;
        }
      }
    }
  
    return numArr[0];
  }
  
  function performOperation(num1, num2, operator) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
    }
  }
  