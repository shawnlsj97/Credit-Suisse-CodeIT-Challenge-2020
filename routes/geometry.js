import { Router } from "express";
var router = Router();

const INF = "INF";

function isNumInRange(num, firstLimit, secondLimit) {
    return num >= Math.min(firstLimit, secondLimit) && num <= Math.max(firstLimit, secondLimit);
}

function calculateGradient(firstPoint, secondPoint) {
    const deltaY = secondPoint['y'] - firstPoint['y'];
    const deltaX = secondPoint['x'] - firstPoint['x'];
    if (deltaX === 0) {
        return INF;
    }
    
    return deltaY / deltaX;
}

function calculateC(point, gradient) {
    if (gradient === INF) {
        return INF;
    }

    // y = mx + c -----> c = y - mx
    return point['y'] - gradient * point['x'];
}

function calculateIntersection(lineGradient, lineC, segmentGradient, segmentC, segmentFirstPoint, segmentSecondPoint) {
    if (lineGradient === segmentGradient) {
        return undefined;
    }

    // first assume the segment extends infinitely in either direction
    // (ml)x + cl = (ms)x + cs ---> (ml)x - (ms)x = cs - cl ---> (ml - ms)x = cs - cl ---> x = (cs - cl) / (ml - ms)
    const x = (segmentC - lineC) / (lineGradient - segmentGradient);
    // y = (ml)x + cl
    const y = lineGradient * x + lineC;

    // check if intersection is actually on the segment
    if (y !== segmentGradient * x + segmentC) {
        return undefined;
    }

    return { "x": x, "y": y };
}

router.post('/', function (req, res) {
    var shapeCoords = req.body['shapeCoordinates'];
    var lineCoords = req.body['lineCoordinates'];

    const lineGradient = calculateGradient(lineCoords[0], lineCoords[1]);
    const lineC = calculateC(lineCoords[0], lineGradient);
    var intersections = [];

    for (let i = 0; i < shapeCoords.length; i++) {
        const firstPoint = shapeCoords[i];
        const secondPoint = shapeCoords[i === shapeCoords.length - 1 ? 0 : i + 1];
        const segmentGradient = calculateGradient(firstPoint, secondPoint);
        // account for either the line being vertical or the segment being vertical or both
        if (lineGradient === INF && segmentGradient === INF) {
            continue;
        } else if (lineGradient === INF && segmentGradient !== INF) {
            // line is vertical, segment not vertical
            // check if x coordinate of line is between x coordinates of segment
            if (isNumInRange(lineCoords[0]['x'], firstPoint['x'], secondPoint['x'])) {
                // intersection present
                const x = lineCoords[0]['x'];
                const y = segmentGradient * x + calculateC(firstPoint, segmentGradient);
                intersections.push({ "x": x, "y": y });
            }
            
            continue;
        } else if (lineGradient !== INF && segmentGradient === INF) {
            // line is not vertical, segment is vertical
            // assume segment extends infinitely first
            const x = firstPoint['x'];
            const y = lineGradient * x + lineC;
            if (isNumInRange(y, firstPoint['y'], secondPoint['y'])) {
                intersections.push({ "x": x, "y": y });
            }

            continue;
        }

        const segmentC = calculateC(firstPoint, segmentGradient);
        const intersection = calculateIntersection(lineGradient, lineC, segmentGradient, segmentC, firstPoint, secondPoint);
        if (intersection !== undefined) {
            intersections.push(intersection);
        }
    }
    
    let result = JSON.stringify(intersections);
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
