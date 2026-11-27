// Name: Ian Gabriel S. Derilo
// Section: IV-BSIT-B
// Activity: N2 - Modular Calculator
// Date: November 26, 2026

// addition
function add(a, b) {
  return a + b;
}

// subtraction
function subtract(a, b) {
  return a - b;
}

// multiplication
function multiply(a, b) {
  return a * b;
}

// division
// since we cant divide by zero, we will show an error message instead of a wrong answer. index.js will catch and show the error
function divide(a, b) {
  if (b === 0) {
    throw new Error('cannot divide by zero.!!!!!');
  }
  return a / b;
}

// thhis will find the average of the list
// reduce() adds up all the numbers, then we divide by how many there are.
function average(numbers) {
  if (numbers.length === 0) {
    throw new Error('average need at least one number.!!!!!');
  }
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}

// console.log(add(27, 9)); // 36
// console.log(subtract(27, 9)); // 18
// console.log(multiply(27, 9)); // 243
// console.log(divide(27, 9)); // 3
// console.log(average([98, 90, 94, 93, 96])); // 94.2


// this will share the functions so other files can use them with require().
module.exports = { add, subtract, multiply, divide, average };