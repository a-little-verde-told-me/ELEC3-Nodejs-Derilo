// Name: Ian Gabriel S. Derilo
// Section: IV-BSIT-B
// Activity: N2 - Modular Calculator
// Date: November 27, 2026

const symbols = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
};

function result(operation, numbers, result) {
  if (operation === 'average') {
    return `average of ${numbers.join(', ')} = ${result}`;
  }
  const symbol = symbols[operation];
  return `${numbers[0]} ${symbol} ${numbers[1]} = ${result}`;
}

module.exports = { result };