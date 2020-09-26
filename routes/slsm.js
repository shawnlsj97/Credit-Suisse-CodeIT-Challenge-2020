import { Router } from "express";
var router = Router();

const Square = Object.freeze({
    BLANK: "BLANK",
    SNAKE: "SNAKE",
    LADDER: "LADDER",
    SMOKE: "SMOKE",
    MIRROR: "MIRROR"
})

const Jump = Object.freeze({
    SNAKE: "SNAKE",
    LADDER: "LADDER",
    SMOKE: "SMOKE",
    MIRROR: "MIRROR"
})

function convertJumpsToObjs(jumps) {
    let jumpObjs = [];
    for (let i = 0; i < jumps.length; i++) {
        const leftRightArgs = jumps[i].split(":");
        const left = parseInt(leftRightArgs[0]);
        const right = parseInt(leftRightArgs[1]);
        if (left === 0) {
            jumpObjs.push({type: Jump.MIRROR, point: right});
        } else if (right === 0) {
            jumpObjs.push({type: Jump.SMOKE, point: left});
        } else if (left < right) {
            jumpObjs.push({type: Jump.LADDER, start: left, end: right});
        } else if (left > right) {
            jumpObjs.push({type: Jump.SNAKE, start: left, end: right});
        }
    }
    return jumpObjs;
}

function createBoard(boardSize, jumpObjs) {
    let board = new Array(boardSize + 1);
    let isSquareSmokeOrMirror = false;
    let isSquareSnakeOrLadder = false;
    for (let i = 1; i <= boardSize; i++) {
        for (let j = 0; j < jumpObjs.length; j++) {
            isSquareSmokeOrMirror = (jumpObjs[j].type === Jump.MIRROR || jumpObjs[j].type === Jump.SMOKE) 
                && jumpObjs[j].point === i;
            isSquareSnakeOrLadder = (jumpObjs[j].type === Jump.SNAKE || jumpObjs[j].type === Jump.LADDER)
                && jumpObjs[j].start === i;
            if (isSquareSmokeOrMirror || isSquareSnakeOrLadder) {
                board[i] = { type: jumpObjs[j].type, jumpObj: jumpObjs[j] };
                break;
            }
        }

        if (!isSquareSmokeOrMirror && !isSquareSnakeOrLadder)
            board[i] = { type: Square.BLANK, squareNumber: i };
    }

    return board;
}

function indexOfSquareTypeInSteps(steps, squareType, isDescendingSearch = false) {
    if (isDescendingSearch) {
        for (let i = steps.length - 1; i >= 0; i++)
            if (steps[i].type === squareType) return i;
        return -1;
    }

    for (let i = 0; i < steps.length; i++)
        if (steps[i].type === squareType) return i;
    return -1;
}

function findWinningRolls(board) {
    const boardSize = board.length;
    
    // find the series of rolls that will lead to victory
    let winningRolls = [];
    let freeRollsIndices = new Set();
    let currStep = 0;
    while (currStep !== boardSize) {
        if (currStep === boardSize) break;

        if (boardSize - currStep <= 6) {
            winningRolls.push(boardSize - currStep);
            currStep = boardSize;
            break;
        }

        const nextSix = [
            board[currStep + 1],
            board[currStep + 2],
            board[currStep + 3],
            board[currStep + 4],
            board[currStep + 5],
            board[currStep + 6]
        ];

        const ladderIndex = indexOfSquareTypeInSteps(nextSix, Square.LADDER);
        if (ladderIndex >= 0) {
            const ladder = nextSix[ladderIndex].jumpObj;
            winningRolls.push(ladder.start - currStep);
            currStep = ladder.end;
            continue;
        }

        const mirrorIndex = indexOfSquareTypeInSteps(nextSix, Square.MIRROR);
        if (mirrorIndex >= 0) {
            const mirror = nextSix[mirrorIndex].jumpObj;
            winningRolls.push(mirror.point - currStep);
            currStep = mirror.point;
            freeRollsIndices.add(winningRolls.length);
            continue;
        }

        // no ladders or mirrors within reach; attempt to avoid the snakes and smoke
        const blankIndex = indexOfSquareTypeInSteps(nextSix, Square.BLANK, true);
        if (blankIndex >= 0) {
            winningRolls.push(nextSix[blankIndex].squareNumber - currStep);
            currStep = nextSix[blankIndex].squareNumber;
            continue;
        }

        // next six steps only contain snakes and/or smoke; try to target a smoke and go back to current step
        const smokeIndex = indexOfSquareTypeInSteps(nextSix, Sqaure.SMOKE);
        if (smokeIndex >= 0) {
            const smoke = nextSix[smokeIndex].jumpObj;
            const roll = smoke.point - currStep;
            winningRolls.push(roll);
            freeRollsIndices.add(winningRolls.length);
            winningRolls.push(roll);
            continue;
        }

        // next six steps only contain snakes; target the snake with the closest endpoint
        let bestSnake = nextSix[0];
        for (let i = 0; i < nextSix.length; i++) {
            const snake = nextSix[i].jumpObj;
            if (snake.end > bestSnake.end) bestSnake = snake;
        }

        winningRolls.push(bestSnake.start - currStep);
        currStep = bestSnake.end;
    }

    return {rolls: winningRolls, freeRollsIndices: freeRollsIndices};
}

function findLosingRolls(board, numWinningRolls) {
    const boardSize = board.length;
    // just need to stagnate until the winner is done winning
    let losingRolls = [];
    let freeRollsIndices = new Set();
    let currStep = 0;
    for (let i = 0; i < numWinningRolls; i++) {
        // if the end is within reach, stop them from reaching the end
        if (boardSize - currStep === 6) {
            losingRolls.push[5];
            currStep = boardSize - 1;
            continue;
        } else if (boardSize - currStep < 6) {
            losingRolls.push(boardSize - currStep + 1);
            currStep = boardSize - 1;
            continue;
        }

        const nextSix = [
            board[currStep + 1],
            board[currStep + 2],
            board[currStep + 3],
            board[currStep + 4],
            board[currStep + 5],
            board[currStep + 6]
        ];

        // if smoke is within reach, roll to smoke and then roll back to current step for the rest of time
        const smokeIndex = indexOfSquareTypeInSteps(nextSix, Square.SMOKE);
        if (smokeIndex >= 0) {
            const smoke = nextSix[smokeIndex].jumpObj;
            const roll = smoke.point - currStep;
            for (let j = i; j < numWinningRolls; j++) {
                losingRolls.push(roll);
                freeRollsIndices.add(losingRolls.length);
                losingRolls.push(roll);
            }
            break;
        }

        // no smoke within reach, just advance one step
        losingRolls.push(1);
        currStep++;
        switch (board[currStep].type) {
            case Square.BLANK:
                continue;
            case Square.MIRROR:
                freeRollsIndices.add(losingRolls.length);
                continue;
            case Square.LADDER:
            case Square.SNAKE:
                currStep = board[currStep].jumpObj.end;
                continue;
        }
    }

    return {rolls: losingRolls, freeRollsIndices: freeRollsIndices};
}

router.post('/', function (req, res) {
    console.log(req.body);
    const boardSize = req.body['boardSize'];
    const players = req.body['players'];
    const jumps = req.body['jumps'];

    const jumpObjs = convertJumpsToObjs(jumps);
    const board = createBoard(boardSize, jumpObjs);
    
    const winningRolls = findWinningRolls(board);
    const numNotFreeWinningRolls = winningRolls.rolls.length - winningRolls.freeRollsIndices.size + 1;
    const losingRolls = findLosingRolls(board, numNotFreeWinningRolls);

    let allRolls = [];
    let loserRollIndex = 0, winnerRollIndex = 0;
    while (winnerRollIndex < winningRolls.rolls.length) {
        let numLoserRollsThisRound = 1;
        if (losingRolls.freeRollsIndices.has(loserRollIndex)) numLoserRollsThisRound++;
        
        for (let loser = 1; loser < players; loser++) {
            for (let i = 0; i < numLoserRollsThisRound; i++) {
                allRolls.push(losingRolls.rolls[loserRollIndex]);
            }
        }

        loserRollIndex += numLoserRollsThisRound;

        allRolls.push(winningRolls.rolls[winnerRollIndex]);
        winnerRollIndex++;
        if (winningRolls.freeRollsIndices.has(winnerRollIndex)) {
            allRolls.push(winningRolls.rolls[winnerRollIndex]);
            winnerRollIndex++;
        }
    }
    /*
    console.log("Winning rolls: " + winningRolls.rolls.toString());
    console.log("Losing rolls: " + losingRolls.rolls.toString());
    console.log(allRolls.toString());
    */
    res.send(allRolls);
});


export default router;
