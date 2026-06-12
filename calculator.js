const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button")
let firstNum = '';
let secondNum = '';
let operator = '=';
let result = ''
// if (operator = '='):
// firstnum += "button clicked"
// if button clicked = a sign
// set operator variable and 
// if secondnum = '' : begin assigning second number
// if secondnum != '' : run operate function 
// firstnum = result of operate
// secondnum = ''
// operator = sign clicked

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const clicked = (event.srcElement.className);
        // if clear is clicked, clear 1st 2nd and result, set operator to =
        if (clicked == "clear") {
            result = '';
            firstNum = '';
            secondNum = '';
            operator = '=';
            screen.textContent = '';
        }
        // if = is clicked, operate and set result. set first and second num to '' and operator to =
        else if (clicked == '=') {
            if (firstNum == '') result = operate(result, secondNum, operator);
            else result = operate(firstNum, secondNum, operator);
            firstNum = '';
            secondNum = '';
            operator = '=';
        }
        // assign first number until an operator is assigned
        else if ((Number(clicked) || clicked == 0) && operator == '=') {
            firstNum += clicked;
            screen.textContent = firstNum;
        }
        // assign second number when operator is assigned
        else if ((Number(clicked) || clicked == 0)) {
            secondNum += clicked;
            screen.textContent = `${firstNum} ${operator} ${secondNum}`
        }
        // if a sign is clicked with no second number, set operator variable
        else if (!(Number(clicked)) && operator == '=') {
            operator = clicked;
            if (firstNum == '') firstNum = result;
            screen.textContent = `${firstNum} ${operator}`;
        }
        // if a sign is clicked with a second number, operate and set firstnum to result
        else if (!Number(clicked)) {
            result = operate(firstNum, secondNum, operator);
            firstNum = result
            secondNum = '';
            operator = clicked;
            screen.textContent = `${firstNum} ${operator}`;
        }
        console.log(clicked);
    })
});


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
            if (b == 0) {screen.textContent = "I can't believe you've done this"; return 0}
            else {screen.textContent = Math.floor((+a / +b) * 10000) / 10000;
            return `${Math.floor((+a / +b) * 10000) / 10000}`};
        case "=":
            screen.textContent = +a;
            return `${+a}`;
        default: screen.textContent = "ERROR"; 
    }
}
