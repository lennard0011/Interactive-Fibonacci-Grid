import Cell from './cell.js';
import { sleep, range, isPartOfFibonacciSeries } from '../functions/helperFunctions.js'

export default class Grid {
  constructor(canvas, gridWidthPixels, gridHeigthPixels, gridNumberOfColumns, gridNumberOfRows, fibonacciSeriesLength) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    setCanvasSize(this.canvasContext, gridWidthPixels, gridHeigthPixels);
    this.gridWidthPixels = gridWidthPixels;
    this.gridHeigthPixels = gridHeigthPixels;
    this.gridNumberOfColumns = gridNumberOfColumns;
    this.gridNumberOfRows = gridNumberOfRows;
    this.cellWidth = Math.floor(gridWidthPixels / gridNumberOfColumns);
    this.cellHeight = Math.floor(gridHeigthPixels / gridNumberOfRows);
    this.cells = []; // 2d array with first the columns and in the columns the cells
    this.fibonacciSeriesLength = fibonacciSeriesLength;
  }

  draw() {
    // Prefill the canvas with black
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.gridWidthPixels, canvas.height);

    // Now create all cells and color them in.
    for (let currentColumnIndex = 0; currentColumnIndex < this.gridNumberOfColumns; currentColumnIndex += 1) {
      const columnOfCells = [];
      for (let currentRowIndex = 0; currentRowIndex < this.gridNumberOfRows; currentRowIndex += 1) {
        const x = currentColumnIndex * this.cellWidth;
        const y = currentRowIndex * this.cellHeight;
        const currentCell = new Cell(this.canvasContext, x, y, this.cellWidth, this.cellHeight);
        currentCell.fill('pink');
        columnOfCells.push(currentCell);
      }
      this.cells.push(columnOfCells);
    }
  }

  async clickCellAt(x, y) {
    const xIndex = Math.floor(x / this.cellWidth);
    const yIndex = Math.floor(y / this.cellHeight);

    const xIndices = range(0, this.gridNumberOfColumns);
    const yIndices = range(0, this.gridNumberOfRows);
    const rowIndices = xIndices.map((myXIndex) => [myXIndex, yIndex]);
    const columnIndices = yIndices.map((myYIndex) => [xIndex, myYIndex]);

    const cellsToUpdate = rowIndices.concat(columnIndices);
    this.incrementCellsValueByIndex(cellsToUpdate);
    this.colorCellsByIndex(cellsToUpdate, 'yellow');
    await sleep(200);
    this.colorCellsByIndex(cellsToUpdate, 'pink');
    await this.checkForFibonacci(cellsToUpdate);
  }

  colorCellsByIndex(arrayOfIndices, color) {
    arrayOfIndices.forEach(([x, y]) => {
      this.cells[x][y].fill(color);
    });
  }

  incrementCellsValueByIndex(arrayOfIndices) {
    arrayOfIndices.forEach(([x, y]) => {
      this.cells[x][y].incrementValueBy();
    });
  }

  resetCellsValueByIndex(arrayOfIndices) {
    arrayOfIndices.forEach(([x, y]) => {
      this.cells[x][y].resetValue();
    });
  }

  async checkForFibonacci(arrayOfIndices) {
    for (const [x, y] of arrayOfIndices) {
      const xAdjustmentsToCheck = range(-this.fibonacciSeriesLength + 1, 1);
      for (const xAdjustment of xAdjustmentsToCheck) {
        const neighbourIndices = range(0, this.fibonacciSeriesLength).map((mover) => {
          const newX = x + xAdjustment + mover;
          if (newX >= 0 && newX < this.gridNumberOfColumns) {
            return [newX, y];
          }
        }).filter((entry) => entry);
        // First check if the updated cell is part of a horizontal set of Fibonnaci
        const valuesOfCells = neighbourIndices.map(([x, y]) => this.cells[x][y].value);

        if (valuesOfCells.length === 5 && isPartOfFibonacciSeries(valuesOfCells)) {
          this.triggerSeriesByIndex(neighbourIndices);
        }
      }
    }
  }

  async triggerSeriesByIndex(arrayOfIndices) {
    this.colorCellsByIndex(arrayOfIndices, 'green');
    this.resetCellsValueByIndex(arrayOfIndices);
    await sleep(2000);
    this.colorCellsByIndex(arrayOfIndices, 'pink');
  }
}

function setCanvasSize(canvasContext, width, height) {
  canvasContext.canvas.width = width;
  canvasContext.canvas.height = height;
}
