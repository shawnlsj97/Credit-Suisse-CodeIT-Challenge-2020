Supermarket Maze
Instructions
While shopping for groceries you find that the supermarket is like a maze filled with blocked walkways that hinder your shopping sprees.

Given the floor plan of the supermarket, find the number of steps made within the shortest path from the entrance to the checkout counter.

To make things interesting some mazes are unsolvable, in that case return -1 as number of steps to solve the maze!

Expose a POST endpoint /supermarket for us to verify!

Input
{
    "tests": {
        "0":{
            "maze": [[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
                     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                     [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                     [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
                     [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                     [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                     [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                     [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                     [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                     [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                     [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
            "start": [3, 0],
            "end": [1, 10]
        },
        "1": {
            "maze": [[1, 1, 1, 0, 1, 1, 1, 1, 1],
                     [1, 1, 1, 0, 0, 0, 0, 0, 1],
                     [1, 1, 1, 0, 1, 1, 1, 0, 1],
                     [1, 1, 1, 0, 0, 0, 1, 0, 1],
                     [1, 1, 1, 1, 1, 0, 1, 0, 1],
                     [1, 0, 0, 0, 1, 0, 1, 0, 1],
                     [1, 0, 1, 1, 1, 0, 1, 0, 1],
                     [1, 0, 0, 0, 0, 0, 1, 0, 1],
                     [1, 1, 1, 1, 1, 1, 1, 0, 1]],
            "start": [3, 0],
            "end": [7, 8]
        },
        "2": {
          "maze": [[1, 1, 1, 0, 1, 1, 1, 1, 1],
                   [1, 1, 1, 0, 0, 0, 0, 0, 1],
                   [1, 1, 1, 0, 1, 1, 1, 0, 1],
                   [1, 1, 1, 0, 0, 0, 1, 0, 1],
                   [1, 1, 1, 1, 1, 0, 1, 1, 1],
                   [1, 0, 0, 0, 1, 0, 1, 0, 1],
                   [1, 0, 1, 1, 1, 0, 1, 0, 1],
                   [1, 0, 0, 0, 0, 0, 1, 0, 1],
                   [1, 1, 1, 1, 1, 1, 1, 0, 1]],
          "start": [3, 0],
          "end": [7, 8]
        },
        ...
    }
}
Output Expected
{
    "answers": {
            "0": 29,
            "1": 13,
            "2": -1,
            ...
    }
}
Limitations
Assume that the start point is (X,0) where X can be the x-coordinate within the length of the maze
No diagonal movement
The floor plan
A wall is represented by 1
A walkable space is represented by 0
Example
Example Input
[1, 1, 1, 0, 1, 1, 1]
[1, 0, 1, 0, 0, 0, 1]
[1, 0, 0, 0, 1, 0, 1]
[1, 1, 0, 1, 1, 1, 1]
[1, 0, 0, 0, 0, 1, 1]
[1, 1, 1, 1, 0, 1, 1]

Coordinates will be given in as [x-axis, y-axis]

start: [3, 0]
end: [4, 5]
Example Output
answer: 9
Visualization
[1, 1, 1, 0, 1, 1, 1]
[1, 0, 1, 0, 0, 0, 1]
[1, 0, 0, 0, 1, 0, 1]
[1, 1, 0, 1, 1, 1, 1]
[1, 0, 0, 0, 0, 1, 1]
[1, 1, 1, 1, 0, 1, 1]

Actual number of test cases given may change.