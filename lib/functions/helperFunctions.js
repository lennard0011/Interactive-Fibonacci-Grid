function sleep(time) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Returns an array with integers from start to end. start is included. end is excluded.
function range(start, end) {
  const rangeArray = [];
  for (let i = start; i < end; i += 1) {
    rangeArray.push(i);
  }
  return rangeArray;
}

function isPerfectSquare(num) {
  return Math.sqrt(num) % 1 === 0;
}

function isFibonacciNumber(num) {
  // A number 'n' is a Fibonacci number if and only if
  // (5 * n^2 + 4) or (5 * n^2 - 4) is a perfect square
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

// Returns next fibonacci number based on int currentNumber
// using the golden ratio formula
// (https://en.wikipedia.org/wiki/Fibonacci_sequence#Relation_to_the_golden_ratio).
// the current number does not need to be part of the Fibonacci sequence,
// it only calculates the next number based on the recurrence relation.
function findNextFibonacci(currentNumber) {
  if (currentNumber === 0) {
    return 1;
  }
  // Calculate the golden ratio
  const phi = (1 + Math.sqrt(5)) / 2;

  // Calculate the index of the given number in the Fibonacci sequence
  const index = Math.round(Math.log(currentNumber * Math.sqrt(5) + 0.5) / Math.log(phi));

  // Calculate the next Fibonacci number using the index
  const nextIndex = index + 1;
  const nextFibonacci = Math.round(phi ** nextIndex / Math.sqrt(5));

  return nextFibonacci;
}

function isPartOfFibonacciSeries(values) {
  if (!values || values.length === 0) {
    return false;
  }
  if (!isFibonacciNumber(values[0])) {
    return false;
  }
  // At this point, the first value is part of the Fibonacci sequence.
  // If it is the only value, return true.
  if (values.length === 1) {
    return true;
  }
  // If there is more than 1 value, continue the check.
  // Value 1 has two possible successors (1 and 2
  if (findNextFibonacci(values[0]) !== values[1] && !(values[0] === 1 && values[1] === 1)) {
    return false;
  }
  const isFibonnaciSequence = values.every((value, index) => {
    if (index === 0 || index === 1) {
      return true;
    }
    return value === values[index - 2] + values[index - 1];
  });
  return isFibonnaciSequence;
}

export { sleep, range, isPartOfFibonacciSeries };
