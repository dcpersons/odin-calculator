const screen = document.querySelector(".screen");
const digits = document.querySelectorAll(".digits button");
const operators = document.querySelectorAll(".operators button");
let firstNum = '';
let secondNum = '';
let operator = '';
let result = ''

function printDigit(digit) {
    // assign first number until an operator is assigned
    if (operator == '') {
        (digit == '.' && firstNum.includes('.')) ? null :
        firstNum += digit
        screen.textContent = firstNum;
    }
    
    // assign second number when operator is assigned
    else {
    (digit == '.' && secondNum.includes('.'))  ? null :
    secondNum += digit
    screen.textContent = `${firstNum} ${operator} ${secondNum}`
    }
}

function printOperator(sign) {
    if (sign == "clear") {
        result = '';
        firstNum = '';
        secondNum = '';
        operator = '';
        screen.textContent = '';
    }
    // if = is clicked, operate and set result. set first and second num to '' and operator to =
    else if (sign == '') {
        if (firstNum === '') firstNum = result;
        if (secondNum === '') result = operate(firstNum, secondNum, "")
        result = operate(firstNum, secondNum, operator);
        firstNum = '';
        secondNum = '';
        operator = '';
    }

    // if a sign is clicked with no second number, set operator variable
    else if (secondNum === '') {
        if (firstNum === '') firstNum = result;
        if (firstNum === '' && sign !== '-') null;
        else operator = sign, screen.textContent = `${firstNum} ${operator}`;
    } 

    // if a sign is clicked with a second number, operate and set firstnum to result
    else if (secondNum !== '') {
        result = operate(firstNum, secondNum, operator);
        firstNum = result;
        secondNum = '';
        operator = sign;
        screen.textContent = `${firstNum} ${operator}`;
    }
    
    else operator = sign, screen.textContent = `${firstNum} ${operator}`;
}


function operate(a, b, sign){
    switch (sign) {
        case "+":
            screen.textContent = Math.floor((+a + +b) * 10000) / 10000
            return `${Math.floor((+a + +b) * 10000) / 10000}`;
        case "-":
            screen.textContent = Math.floor((+a - +b) * 10000) / 10000;
            return `${Math.floor((+a - +b) * 10000) / 10000}`;
        case "*":
            screen.textContent = Math.floor((+a * +b) * 10000) / 10000;
            return `${Math.floor((+a * +b) * 10000) / 10000}`;
        case "\u00F7":
            if (b == 0) {screen.textContent = "I can't believe you've done this"; return '0'}
            else {screen.textContent = Math.floor((+a / +b) * 10000) / 10000;
            return `${Math.floor((+a / +b) * 10000) / 10000}`};
        case "":
            screen.textContent = +a;
            return `${+a}`;
        default: screen.textContent = "ERROR"; 
    }
}

function deletePrevious() {
    if (secondNum == '') {
        if (operator == '') {
            firstNum = firstNum.slice(0,-1);
        } else operator = '';
    } else secondNum = secondNum.slice(0,-1);
    screen.textContent = `${firstNum} ${operator} ${secondNum}`
}

digits.forEach(button => {
    button.addEventListener("click", (event) => {
        const digit = (event.srcElement.className);
        printDigit(digit);
    })
})


operators.forEach(button => {
    button.addEventListener("click", (event) => {
        const clicked = (event.srcElement.className);
        printOperator(clicked);
    })
})

document.addEventListener("keydown", (event) => {
    const key = String(event.key);
    if (key >= 0 && key <= 9 || key == '.') printDigit(key);
    if (key == '+' || key == '-' || key == '*') printOperator(key);
    if (key == '/') printOperator('\u00F7');
    if (key == 'Enter' || key == '=') printOperator('');
    if (key == 'Delete' || key == 'Escape') printOperator('clear');
    if (key == 'Backspace') deletePrevious();
})
