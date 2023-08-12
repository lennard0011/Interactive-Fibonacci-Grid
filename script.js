import Grid from './lib/classes/grid.js';

const gridWidthPixels = 600;
const gridHeigthPixels = 600;
const gridNumberOfColumns = 50;
const gridNumberOfRows = 50;

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
canvasContext.canvas.width = gridWidthPixels;
canvasContext.canvas.height = gridHeigthPixels;
canvas.addEventListener('click', handleClick);

function handleClick(e) {
  const clickX = e.offsetX;
  const clickY = e.offsetY;
  myGrid.clickCellAt(clickX, clickY);
}

const myGrid = new Grid(canvas, gridWidthPixels, gridHeigthPixels, gridNumberOfColumns, gridNumberOfRows, 5);
myGrid.draw();
