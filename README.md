# Interactive-Fibonacci-Grid
An interactive grid in html that reacts on fibonacci series on the values of the cells. Feel free to test around on the [Github Page](https://lennard0011.github.io/Interactive-Fibonacci-Grid/).

This application presents a grid consisting of cells. All cells have a integer value, at start their value is 0. If you click on a cell, all cells in that row and column will briefly turn yellow and have their value incremented by 1. If 5 consecutive cells with the values of the Fibonacci sequence are next to each other (horizontally), they briefly turn green and have their value reset to 0.

# How to run yourself?
1. Clone the repository.
2. From the root folder, run a webserver. I recommand the VS Code extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Open the webpage.

# Contribute
1. Clone the repository.
2. Create a new branch.
3. From the root folder run npm i
4. Make your changes
5. Make sure you didn't add any new linter warnings and the functionality is covered via tests.
6. Create a PR to the main branch.

# Architecture
First the grid is created with the cells and drawn on the canvas on the page. Event listeners are added to trigger updates to the grid with every click on the grid. 

When the grid is clicked, it is determined which cell is clicked. Then all row and column neighbours of the cell are determined. The value of all these cells is increment by one. After the increment we check all ranges of cells where the updated cells are part. If a range satisfies the Fibonacci requirement, then we trigger the reset.

# Further improvements
1. Abstract the cell class by moving the logic of increment, reset and initialise to the cell class.
2. Reduce the number of ranges that need to be checked with every update.
3. <del>Capture the edge case where if cell has its value reset to 0 due to a reset, it suddenly is part of a Fibonacci series. E.g. When we have the range [5, 1, 1, 2, 3] and the first cell with value 5 gets reset to 0, we don't check the this particular range anymore which will result in a range of [0, 1, 1, 2, 3] not being checked.</del> RESOLVED