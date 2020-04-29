const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');

let currentOperand = '';
let previousOperand = '';
let op;

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(operation) {
    op = operation;
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (op) {
        case '+': 
            computation = prev + curr;
            break;
        
        case '-': 
            computation = prev - curr;
            break;

        case '×': 
            computation = prev * curr;
            break;

        case '÷': 
            computation = prev / curr;
            break;
        default: 
            return;
    }
    currentOperand = computation;
    op = undefined;
    previousOperand = '';
}

function clear() {
    currentOperand = '';
    previousOperand= '';
    op = undefined;
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function updateDisplay() {
    currentOperandText.innerText = currentOperand;
    if (op != undefined){
        previousOperandText.innerText = `${previousOperand} ${op}`;
    } else {
        previousOperandText.innerText = '';
    }
}

// Number Buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

// Operation Buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    });
});

// Equal Button
equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
})

// AC (All Clear) Button
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
})

// Delete Button
deleteButton.addEventListener('click', () => {
    del();
    updateDisplay();
});