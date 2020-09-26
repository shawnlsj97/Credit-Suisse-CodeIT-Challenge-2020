import { Router } from "express";
var router = Router();
var alphabets = { A: 0, C: 0, G: 0, T: 0 }; // initialise alphabet library

function countAlphabet(currSeq) {
    for (let i = 0; i < currSeq.length; i++) {
      var currCount = alphabets[currSeq[i]];
      currCount++;
      alphabets[currSeq[i]] = currCount
    }
}

router.post("/", function (req, res) {
    var input = req.body; // json object
    var list = input["list"];
    console.log(list.length);
    console.log(typeof list);
    for (var i = 0; i < list.length; i++) {
        var currObj = list[i];
        var currSeq = currObj["geneSequence"];
        countAlphabet(currSeq)
    }
    console.log(JSON.stringify(alphabets))
    res.send(input);
});


export default router;
