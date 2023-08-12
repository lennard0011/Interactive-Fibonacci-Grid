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
  }

  incrementValueBy(incremental = 1) {
    this.value += incremental;
  }

  resetValue() {
    this.value = 0;
  }
}
