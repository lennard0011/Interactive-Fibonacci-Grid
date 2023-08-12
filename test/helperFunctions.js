import { expect } from 'chai';
import { sleep, range, isPartOfFibonacciSeries } from '../lib/functions/helperFunctions.js'; // Update the path to the correct location of the helperFunctions file

describe('Helper Functions', () => {
  describe('sleep', () => {
    it('should resolve after the specified time', async () => {
      const start = Date.now();
      const delay = 100; // milliseconds
      await sleep(delay);
      const end = Date.now();
      const elapsed = end - start;
      expect(elapsed).to.be.closeTo(delay, 40); // Allow a small deviation
    });
  });

  describe('range', () => {
    it('should generate an array with integers from start to end', () => {
      expect(range(0, 5)).to.deep.equal([0, 1, 2, 3, 4]);
      expect(range(3, 8)).to.deep.equal([3, 4, 5, 6, 7]);
    });

    it('should generate an empty array if start is equal to or greater than end', () => {
      expect(range(5, 5)).to.deep.equal([]);
      expect(range(8, 3)).to.deep.equal([]);
    });
  });

  describe('isPartOfFibonacciSeries', () => {
    it('should return true for an empty array', () => {
      expect(isPartOfFibonacciSeries([])).to.be.false;
    });

    it('should return false for an array with a single non-Fibonacci value', () => {
      expect(isPartOfFibonacciSeries([7])).to.be.false;
    });

    it('should return true for an array with a single Fibonacci value', () => {
      expect(isPartOfFibonacciSeries([0])).to.be.true;
      expect(isPartOfFibonacciSeries([1])).to.be.true;
      expect(isPartOfFibonacciSeries([2])).to.be.true;
      expect(isPartOfFibonacciSeries([5])).to.be.true;
    });

    it('should return false for an array with consecutive non-Fibonacci values', () => {
      expect(isPartOfFibonacciSeries([1, 1, 1])).to.be.false;
      expect(isPartOfFibonacciSeries([2, 3, 6])).to.be.false;
    });

    it('should return true for an array with consecutive Fibonacci values', () => {
      expect(isPartOfFibonacciSeries([0, 1, 1, 2, 3])).to.be.true;
      expect(isPartOfFibonacciSeries([13, 21, 34])).to.be.true;
    });
  });

  // Add tests for other functions (isPerfectSquare, isFibonacciNumber, findNextFibonacci) if needed
});
