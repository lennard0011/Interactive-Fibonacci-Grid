/*
A cell is part of a canvas and has coordinates, size which are used for the drawing on the grid.
A cell also holds a integer value.
*/

export default class Cell {
  constructor(canvasContext, x, y, width, height, value = 0) {
    this.canvasContext = canvasContext;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
  }

  fill(color) {
    this.canvasContext.fillStyle = color;
    // The square is filled except for its borders, therefore the shrinking of dimensions
    this.canvasContext.fillRect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);

    this.canvasContext.fillStyle = 'red';
    this.canvasContext.font = `${this.height}px Arial`;
    this.canvasContext.fillText(this.value, this.x, this.y + this.height, this.width);
  }

  incrementValueBy(incremental = 1) {
    this.value += incremental;
  }

  resetValue() {
    this.value = 0;
  }
}
