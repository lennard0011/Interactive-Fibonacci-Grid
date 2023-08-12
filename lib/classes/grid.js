/* eslint-disable import/extensions */
import Cell from './cell.js';
import { sleep, range, isPartOfFibonacciSeries } from '../functions/helperFunctions.js';
import configurations from '../../globals.js';

const {
  idleColor,
  updateColor,
  resetColor,
  updateDuration,
  resetDuration,
} = configurations.cell;

function setCanvasSize(canvasContext, width, height) {
  // eslint-disable-next-line no-param-reassign
  canvasContext.canvas.width = width;
  // eslint-disable-next-line no-param-reassign
  canvasContext.canvas.height = height;
}

/*
A grid is part of a canvas and consists of cells.
The grid can be drawn on the canvas.
We can click a cell and update the whole grid.
After the update, the changed cells are checked
and reset if they satisfy the Fibonacci requirement.
*/

export default class Grid {
  constructor(
    canvas,
    gridWidthPixels,
    gridHeigthPixels,
    gridNumberOfColumns,
    gridNumberOfRows,
    fibonacciSeriesLength,
  ) {
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
    this.addCells();
    this.fibonacciSeriesLength = fibonacciSeriesLength;
  }

  addCells() {
    // eslint-disable-next-line max-len
    for (let currentColumnIndex = 0; currentColumnIndex < this.gridNumberOfColumns; currentColumnIndex += 1) {
      const columnOfCells = [];
      for (let currentRowIndex = 0; currentRowIndex < this.gridNumberOfRows; currentRowIndex += 1) {
        const x = currentColumnIndex * this.cellWidth;
        const y = currentRowIndex * this.cellHeight;
        const currentCell = new Cell(this.canvasContext, x, y, this.cellWidth, this.cellHeight);
        columnOfCells.push(currentCell);
      }
      this.cells.push(columnOfCells);
    }
  }

  draw() {
    // Now create all cells and color them in.
    // eslint-disable-next-line max-len
    this.cells.forEach((currentColumn) => {
      currentColumn.forEach((currentCell) => currentCell.fill(idleColor));
    });
  }

  async clickCellAt(x, y) {
    const xIndex = Math.floor(x / this.cellWidth);
    const yIndex = Math.floor(y / this.cellHeight);

    // collect all horizontal indices and vertical indices to check.
    // The indices of the cell itself are included in the horizontal range.
    const xIndices = range(0, this.gridNumberOfColumns);
    const yIndices = range(0, yIndex).concat(range(yIndex + 1, this.gridNumberOfRows));
    const rowIndices = xIndices.map((myXIndex) => [myXIndex, yIndex]);
    const columnIndices = yIndices.map((myYIndex) => [xIndex, myYIndex]);
    const cellsToUpdate = rowIndices.concat(columnIndices);

    this.incrementCellsValueByIndex(cellsToUpdate);
    this.colorCellsByIndex(cellsToUpdate, updateColor);
    await sleep(updateDuration);
    this.colorCellsByIndex(cellsToUpdate, idleColor);
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

  areIndicesInGrid(x, y) {
    return x >= 0 && x < this.gridNumberOfColumns && y >= 0 && y < this.gridNumberOfRows;
  }

  async checkForFibonacci(arrayOfIndices) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [x, y] of arrayOfIndices) {
      const xAdjustmentsToCheck = range(-this.fibonacciSeriesLength + 1, 1);
      // eslint-disable-next-line no-restricted-syntax
      for (const xAdjustment of xAdjustmentsToCheck) {
        // eslint-disable-next-line max-len
        const neighbourIndices = range(0, this.fibonacciSeriesLength).reduce((accumulator, mover) => {
          const newX = x + xAdjustment + mover;
          if (this.areIndicesInGrid(newX, y)) {
            accumulator.push([newX, y]);
          }
          return accumulator;
        }, []);
        // First check if the updated cell is part of a horizontal set of Fibonnaci
        // eslint-disable-next-line max-len
        const valuesOfCells = neighbourIndices.map(([neighbourX, neighbourY]) => this.cells[neighbourX][neighbourY].value);

        // if cells satisfy Fibonacci condition, reset cells and check for new fibonacci.
        // eslint-disable-next-line max-len
        if (valuesOfCells.length === this.fibonacciSeriesLength && isPartOfFibonacciSeries(valuesOfCells)) {
          this.resetCellsByIndex(neighbourIndices);
          this.checkForFibonacci(neighbourIndices);
        }
      }
    }
  }

  async resetCellsByIndex(arrayOfIndices) {
    this.colorCellsByIndex(arrayOfIndices, resetColor);
    this.resetCellsValueByIndex(arrayOfIndices);
    await sleep(resetDuration);
    this.colorCellsByIndex(arrayOfIndices, idleColor);
  }
}
