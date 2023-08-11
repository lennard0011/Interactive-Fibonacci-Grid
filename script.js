const gridContainer = document.getElementById('grid');
const gridSize = 3;
const cellElements = [];

// Create grid
for (let i = 0; i < gridSize; i++) {
  cellElements[i] = [];
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cellElements[i][j] = {
      element: cell,
      value: 0,
    };
    cell.addEventListener('click', () => handleClick(i, j));
    gridContainer.appendChild(cell);
  }
}

// Handle cell click
function handleClick(row, col) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i === row || j === col) {
        increaseCellValue(i, j);
      }
    }
  }
  checkFibonacci();
}

// Increase cell value
function increaseCellValue(row, col) {
  const cell = cellElements[row][col];
  cell.value = cell.value === 0 ? 1 : cell.value + 1;
  cell.element.innerText = cell.value;
  cell.element.style.backgroundColor = 'yellow';
  setTimeout(() => {
    cell.element.style.backgroundColor = '';
  }, 500);
}

// Check for consecutive Fibonacci sequence
function checkFibonacci() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize - 4; j++) {
      let isFibonacci = true;
      let sequenceSum = 0;
      for (let k = 0; k < 5; k++) {
        sequenceSum += cellElements[i][j + k].value;
        if (!isFibonacci || !isPerfectSquare(5 * cellElements[i][j + k].value ** 2 + 4) && !isPerfectSquare(5 * cellElements[i][j + k].value ** 2 - 4)) {
          isFibonacci = false;
        }
      }
      if (isFibonacci) {
        for (let k = 0; k < 5; k++) {
          cellElements[i][j + k].element.style.backgroundColor = 'green';
          cellElements[i][j + k].value = 0;
          cellElements[i][j + k].element.innerText = '';
        }
      }
    }
  }
}

// Check if a number is a perfect square
function isPerfectSquare(num) {
  return Math.sqrt(num) % 1 === 0;
}
