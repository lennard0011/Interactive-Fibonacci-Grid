import { expect } from 'chai';
import Cell from '../lib/classes/cell.js';

describe('Cell Class', () => {
  let canvasContext;
  let cell;

  beforeEach(() => {
    // Mock canvas context
    canvasContext = {
      fillStyle: '',
      fillRect: () => {},
    };

    cell = new Cell(canvasContext, 10, 20, 30, 30);
  });

  it('should create a new Cell object', () => {
    expect(cell).to.be.an.instanceOf(Cell);
    expect(cell.canvasContext).to.equal(canvasContext);
    expect(cell.x).to.equal(10);
    expect(cell.y).to.equal(20);
    expect(cell.width).to.equal(30);
    expect(cell.height).to.equal(30);
    expect(cell.value).to.equal(0);
  });

  it('should fill the cell with the specified color', () => {
    cell.fill('red');
    // You should assert that the canvasContext.fillStyle is set correctly.
    // This example assumes that you have a way to access the canvasContext state.
    expect(canvasContext.fillStyle).to.equal('red');
  });

  it('should increment the cell value by the specified amount', () => {
    cell.incrementValueBy(5);
    expect(cell.value).to.equal(5);

    cell.incrementValueBy(3);
    expect(cell.value).to.equal(8);
  });

  it('should reset the cell value to 0', () => {
    cell.incrementValueBy(5);
    cell.resetValue();
    expect(cell.value).to.equal(0);
  });
});
