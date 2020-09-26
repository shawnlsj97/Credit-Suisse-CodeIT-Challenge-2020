import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    const tests = req.body['tests'];

    let answers = { "answers": {} };

    for (const [testIndexStr, testData] of Object.entries(tests)) {
        const seats = testData['seats'];
        const people = testData['people'];
        const spacesBetweenTwoPeople = testData['spaces'];
    
        const totalNumSpaces = spacesBetweenTwoPeople * (people - 1);
        let combinations = 1;
        for (let i = 0; i < people; i++) {
            combinations *= seats - totalNumSpaces - i;
        }
    
        let identicalRemoval = 1;
        for (let i = people; i > 0; i--) {
            identicalRemoval *= i;
        }
    
        combinations /= identicalRemoval;

        answers['answers'][testIndexStr] = combinations;
    }

    res.send(JSON.stringify(answers));
});


export default router;
