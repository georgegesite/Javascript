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
