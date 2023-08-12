/* eslint-disable import/extensions */
import Grid from './lib/classes/grid.js';
import configurations from './globals.js';

const { gridSize, fibonacciSeriesLength } = configurations;

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
canvasContext.canvas.width = gridSize.gridWidthPixels;
canvasContext.canvas.height = gridSize.gridHeigthPixels;

const myGrid = new Grid(
  canvas,
  gridSize.gridWidthPixels,
  gridSize.gridHeigthPixels,
  gridSize.gridNumberOfColumns,
  gridSize.gridNumberOfRows,
  fibonacciSeriesLength,
);

function handleClick(e) {
  const clickX = e.offsetX;
  const clickY = e.offsetY;
  myGrid.clickCellAt(clickX, clickY);
}

canvas.addEventListener('click', handleClick);

myGrid.draw();
