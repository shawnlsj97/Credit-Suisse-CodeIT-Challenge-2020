Snakes & Ladders, Smoke & Mirrors
How To Play
Snakes & Ladders, Smoke & Mirrors is an extension of regular Snakes & Ladders game.

It is played with a single six-sided die.

Beside the jumps Snakes and Ladders, there are two additional jumps, Smoke and Mirror, on the board.

Smoke
Roll the die again, and move backwards by that value (like how Snake moves backwards).
Mirror
Roll the die again, and move forwards by that value (like how Ladders moves forwards).
The game ends when a player reaches the end.

If the player overshoots, the player will move backwards by the extra steps.

For example, if the board is 10x10, the player is on square 99 and rolled 2, the final square will still be 99 (given (100 - (99 + 2 - 100))).

This version of the game does not grant an additional die roll when a six (6) is rolled.

Objective
Given a board and number of players, you will return a list of die rolls such that the game ends with the last player winning.

Upon a successful play with the die rolls, a score of (board size) / (number of squares landed) will be given.

Otherwise, the score is 0.

We will do a POST request on your team URL with the endpoint /slsm.

Scoring
Your solution will be evaluated (i.e. played) twelve times with varying difficulty levels, which are added to give a raw score.

If the last player wins all games, the raw score will be divided by two and be at least 20, else the raw score will be divided by four, to arrive at the final score.

The maximum point is 100, before factoring in challenge difficulty weightage.

Constraints
Board size, boardSize, is a product of width and height, which will each be between 8 and 20, inclusive.
Number of players, players, will be between 2 and 8, inclusive.
Squares are 1-based, so the first square is 1 and the last square will be width * height.
Both the first and last squares will not be the start or end of any jump.
A Smoke will not appear before the sixth square (so that the second die roll will not go beyond the first square).
A Mirror will not appear within the last six squares (so that the second die roll will not go beyond the last square).
None of the jumps' squares will conflict with one another.
There will be at least one of each jump.
Sample input
{"boardSize":100,"players":4,"jumps":["59:39","9:37","42:0","0:3"]}
Explanation:

Board size: 100
Players: 4
Jumps (directions are important!):
Snake: From 59 to 39
Ladder: From 9 to 37
Smoke: From 42 to -<0>, <0> being a die roll placeholder (direction 42:0 resembling a Snake)
Mirror: From 3 to +<0>, <0> being a die roll placeholder (direction 0:3 resembling a Ladder)
Usage of 0 as a die roll placeholder is to facilitate parsing of values as integers
Sample output
[1, 2, 3, 4, 5, 6]
A list of die rolls.

Live example
Click here.

The input example is in "input" and the output (i.e. your endpoint result) is in "output".