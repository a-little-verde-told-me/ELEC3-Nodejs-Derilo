// Name: Ian Gabriel S. Derilo
// Section: IV-BSIT-B
// Activity: N2 - Modular Calculator
// Date: November 27, 2026

const path = require('path');

// import the two modules
const operations = require('./operations');
const { formatResult } = require('./formatter');

// process.argv is an array string and slice(2) will copies evrything from index 2 to the end, this will strips out the index0(node) and index1(filename)
const args = process.argv.slice(2);
const operation = args[0]; // first argument of the user like add
const rawNumbers = args.slice(1); // remaining arguments as text

const validOperations = ['add', 'subtract', 'multiply', 'divide', 'average'];

function showUsage() {
    console.log('\n=========================    READ THIS   =======================');
    console.log('how to run: node index.js <your chosen operations> <numbers you want to enter>');
    console.log('available operations: add, subtract, multiply, divide, average');
    console.log('example: node index.js average 88 92 85');
    console.log('==================================================================');
    console.log(`you are currently running ${path.basename(__filename)}\n`);
}

// we need to find the right operation and return the result
function calculate(numbers) {
    switch (operation) {
        case 'add':
            return operations.add(numbers[0], numbers[1]);
        case 'subtract':
            return operations.subtract(numbers[0], numbers[1]);
        case 'multiply':
            return operations.multiply(numbers[0], numbers[1]);
        case 'divide':
            return operations.divide(numbers[0], numbers[1]);
        case 'average':
            return operations.average(numbers);
    }
}

function main() {
    // when user did not enter something after the filename
    if (!operation) {
        console.log('\n!!!!! error: please type an operation.!!!!!');
        showUsage();
        return;
    }

    // when the user entered operation that is not supported
    if (!validOperations.includes(operation)) {
        console.log(`\n!!!!! error: unknown operation "${operation}".!!!!!`);
        showUsage();
        return;
    }

    // when user entered no numbers or blank/whitespace-only values
    if (rawNumbers.length === 0 || rawNumbers.some((val) => val.trim() === '')) {
        console.log('\n!!!!! error: please type valid numbers.!!!!!');
        showUsage();
        return;
    }

    // this will convert text into numbers and reject those are not a number
    const numbers = rawNumbers.map(Number);
    if (numbers.some(Number.isNaN)) {
        console.log('\n!!!!! error: please type valid numbers.!!!!!');
        showUsage();
        return;
    }

    // when the chosen operation is not average and user did not enter 2 numbers
    if (operation !== 'average' && numbers.length !== 2) {
        console.log(`\n!!!!! error: ${operation} needs exactly two numbers.!!!!!`);
        return;
    }

    // when the user entered 0 as the second number
    try {
        const result = calculate(numbers);
        console.log(formatResult(operation, numbers, result));
    } catch (error) {
        console.log('\n!!!!! error: ' + error.message);
    }
}

main();