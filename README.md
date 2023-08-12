# Interactive-Fibonacci-Grid
An interactive grid in html that reacts on fibonacci series on the values of the cells. Feel free to test around on the [Github Page](https://lennard0011.github.io/Interactive-Fibonacci-Grid/).

This application presents a grid consisting of cells. All cells have a integer value, at start their value is 0. If you click on a cell, all cells in that row and column will briefly turn yellow and have their value incremented by 1. If 5 consecutive cells with the values of the Fibonacci sequence are next to each other (horizontally), they briefly turn green and have their value reset to 0.

# General idea

We check if a cell is part of the Fibonacci order by testing the following formula (5x^2 + 4) or (5x^2 - 4) is a perfect square where x is the value of the cell.

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

## Classes

### Cell