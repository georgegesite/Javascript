let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = '';
let memory = 0;

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
            let result = calculate(screenValue);
            screen.value = result;
            memory = result;
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
    let numArr = str.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g).map(val => {
        if (val.startsWith('+') || val.startsWith('-')) {
            return parseFloat(val);
        } else {
            return parseFloat(val);
        }
    });

    let operators = str.match(/[+\-*/]/g);
    let result = numArr[0];
    for (let i = 0; i < operators.length; i++) {
        let operator = operators[i];
        let num = numArr[i+1];
        switch (operator) {
            case '+':
                result += num;
                break;
            case '-':
                result -= num;
                break;
            case '*':
                result *= num;
                break;
            case '/':
                result /= num;
                break;
        }
    }
    return result;
}
