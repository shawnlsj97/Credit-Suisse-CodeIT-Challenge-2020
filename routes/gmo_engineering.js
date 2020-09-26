import { Router } from "express";
var router = Router();
var alphabets = { a: 0, c: 0, g: 0, t: 0 }; // initialise alphabet library

function countAlphabet(currSeq) {
    for (alphabet in currSeq) {
        switch (alphabet) {
            case "a":
                var currCount = alphabets["a"];
                currCount++;
                alphabets["a"] = currCount;
                break;
            case "c":
                var currCount = alphabets["c"];
                currCount++;
                alphabets["c"] = currCount;
                break;
            case "g":
                var currCount = alphabets["g"];
                currCount++;
                alphabets["g"] = currCount;
                break;
            case "t":
                var currCount = alphabets["t"];
                currCount++;
                alphabets["t"] = currCount;
                break;
            default:
                throw new Error("Unrecogised alphabet");
        }
    }
}
router.post("/", function (req, res) {
    var input = req.body; // json object
    var list = input["list"];
    for (entry in list) {
        var currSeq = entry["geneSequence"];
        countAlphabet(currSeq)
    }
    console.log(JSON.stringify(alphabets))
    res.send(input);
});


export default router;
