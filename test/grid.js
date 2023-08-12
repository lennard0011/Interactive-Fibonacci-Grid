/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { expect } from 'chai';
import Grid from '../lib/classes/grid.js'; // Update the path to the correct location of the Grid class

describe('Grid Class', () => {
  let canvas;
  let grid;

  beforeEach(() => {
    // Mock canvas or provide your own canvas implementation
    canvas = {
      getContext: () => ({
        fillStyle: '',
        fillRect: () => {},
        canvas: { width: 0, height: 0 },
      }),
    };

    grid = new Grid(canvas, 500, 500, 10, 10, 5);
  });

  it('should create a new Grid object', () => {
    expect(grid).to.be.an.instanceOf(Grid);
    expect(grid.canvas).to.equal(canvas);
    expect(grid.gridWidthPixels).to.equal(500);
    expect(grid.gridHeigthPixels).to.equal(500);
    expect(grid.gridNumberOfColumns).to.equal(10);
    expect(grid.gridNumberOfRows).to.equal(10);
    expect(grid.cellWidth).to.equal(50);
    expect(grid.cellHeight).to.equal(50);
    expect(grid.cells).to.be.an('array').that.is.empty;
    expect(grid.fibonacciSeriesLength).to.equal(5);
  });
});
