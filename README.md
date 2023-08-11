# Interactive-Fibonacci-Grid
An interactive grid in html that reacts on fibonacci series on the values of the cells.

This application presents a grid consisting of cells. All cells have a integer value, at start their value is 0. If you click on a cell, all cells in that row and column will briefly turn yellow and have their value incremented by 1. If 5 consecutive cells with the values of the Fibonacci sequence are next to each other, they briefly turn green and have their value reset to 0.

# General idea

We check if a cell is part of the Fibonacci order by testing the following formula (5x^2 + 4) or (5x^2 - 4) is a perfect square where x is the value of the cell.

# How to run?

# Architecture

## Classes