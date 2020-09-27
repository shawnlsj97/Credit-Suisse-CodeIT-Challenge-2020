import { Router } from "express";
var router = Router();

function findNumStepsToExit(mazeArr2d, start, end) {
    const rows = mazeArr2d.length;
    const cols = mazeArr2d[0].length;
    const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];

    function isOutsideMaze(row, col) {
        return row < 0 || row >= rows || col < 0 || col >= cols;
    }

    function isBlocked(row, col) {
        return mazeArr2d[row][col] === 1;
    }

    let visited = mazeArr2d.slice();
    function findShortestPath(currRow, currCol, shortestSteps, currSteps) {
        if (currRow === end[1] && currCol === end[0]) {
            return Math.min(shortestSteps, currSteps);
        }

        visited[currRow][currCol] = 2;

        for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
            const direction = directions[directionIndex];
            const nextSquare = [currRow + direction[0], currCol + direction[1]]
            if (!isOutsideMaze(nextSquare[0], nextSquare[1])
                && !isBlocked(nextSquare[0], nextSquare[1])
                && visited[nextSquare[0]][nextSquare[1]] !== 2) {
                shortestSteps = findShortestPath(nextSquare[0], nextSquare[1], shortestSteps, currSteps + 1);
            }
        }

        // backtrack
        visited[currRow][currCol] = 0;
        return shortestSteps;
    }

    let shortestSteps = findShortestPath(start[1], start[0], Infinity, 0);
    if (shortestSteps === Infinity) {
        return -1;
    }

    return shortestSteps + 1;
}

router.post('/', function (req, res) {
    var tests = req.body['tests'];

    let answers = {};

    for (const [testIndex, mazeObj] of Object.entries(tests)) {
        answers[testIndex] = findNumStepsToExit(mazeObj.maze, mazeObj.start, mazeObj.end);
    }
    
    res.send({answers: answers});
});


export default router;
