// Name: Ian Gabriel S. Derilo
// Section: IV-BSIT-B
// Activity: N2 - Modular Calculator
// Date: November 27, 2026

// import our own modules
const operations = require('./operations');
const { formatResult } = require('./formatter');

// process.argv is an array string and slice(2) will copies evrything from index 2 to the end, this will strips out the index0(node) and index1(filename)
const args = process.argv.slice(2);
const operation = args[0]; //first argument of the user like add
const numbers = args.slice(1).map(Number); // this will turn the text into numbers

let result;
switch (operation) {
  case 'add':
    result = operations.add(numbers[0], numbers[1]);
    break;
  case 'subtract':
    result = operations.subtract(numbers[0], numbers[1]);
    break;
  case 'multiply':
    result = operations.multiply(numbers[0], numbers[1]);
    break;
  case 'divide':
    result = operations.divide(numbers[0], numbers[1]);
    break;
  case 'average':
    result = operations.average(numbers);
    break;
}

console.log(formatResult(operation, numbers, result));