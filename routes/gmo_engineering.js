import { Router } from "express";
var router = Router();
var alphabets = { A: 0, C: 0, G: 0, T: 0 };

function countAlphabet(currSeq) {
    for (let i = 0; i < currSeq.length; i++) {
      let currCount = alphabets[currSeq[i]];
      currCount++;
      alphabets[currSeq[i]] = currCount;
    }
}

function resetAlphabet() {
    alphabets = { A: 0, C: 0, G: 0, T: 0 };
}

function appendAs(strToAppendTo, numAsLeft) {
    if (numAsLeft > 0) {
        if (numAsLeft >= 2) {
            strToAppendTo += "AA";
            numAsLeft -= 2;
        } else {
            strToAppendTo += "A";
            numAsLeft--;
        }
    }
    return {str: strToAppendTo, a: numAsLeft};
}

function rearrangeGenome() {
    let numCCs = 0;
    let numACGTs = 0;
    // search for pairs of CC
    if (alphabets["C"] >= 2) {
        numCCs = Math.trunc(alphabets["C"] / 2);
        alphabets["C"] = alphabets["C"] - numCCs * 2;
    }

    // check for ACGT
    const numCombisPossible = Math.min(alphabets["A"], alphabets["C"], alphabets["G"], alphabets["T"]);
    if (numCombisPossible >= 1) {
        numACGTs = numCombisPossible;
        alphabets["A"] = alphabets["A"] - numCombisPossible;
        alphabets["C"] = alphabets["C"] - numCombisPossible;
        alphabets["G"] = alphabets["G"] - numCombisPossible;
        alphabets["T"] = alphabets["T"] - numCombisPossible;
    }

    // start putting the string together while keeping the AAAs apart
    let newSeq = "";
    let numAsLeft = alphabets["A"];
    for (let i = 0; i < numCCs; i++) {
        // insert As
        const postAppendA = appendAs(newSeq, numAsLeft);
        newSeq = postAppendA['str'];
        numAsLeft = postAppendA['a'];
        newSeq += "CC";
    }

    for (let i = 0; i < numACGTs; i++) {
        // insert As
        const postAppendA = appendAs(newSeq, numAsLeft);
        newSeq = postAppendA['str'];
        numAsLeft = postAppendA['a'];
        newSeq += "ACGT";
    }

    // no CC or ACGT left, insert remaining while keep the AAAs apart
    for (let i = 0; i < alphabets["C"]; i++) {
        // insert As
        const postAppendA = appendAs(newSeq, numAsLeft);
        newSeq = postAppendA['str'];
        numAsLeft = postAppendA['a'];
        newSeq += "C";
    }
    for (let i = 0; i < alphabets["G"]; i++) {
        // insert As
        const postAppendA = appendAs(newSeq, numAsLeft);
        newSeq = postAppendA['str'];
        numAsLeft = postAppendA['a'];
        newSeq += "G";
    }
    for (let i = 0; i < alphabets["T"]; i++) {
        // insert As
        const postAppendA = appendAs(newSeq, numAsLeft);
        newSeq = postAppendA['str'];
        numAsLeft = postAppendA['a'];
        newSeq += "T";
    }

    // insert the rest of the As
    newSeq += "A".repeat(numAsLeft);

    return newSeq;
}

router.post("/", function (req, res) {
    const input = req.body; // json object
    const list = input["list"];

    for (let i = 0; i < list.length; i++) {
        var currObj = list[i];
        var currSeq = currObj["geneSequence"];
        countAlphabet(currSeq);
        input["list"][i]["geneSequence"] = rearrangeGenome();
        resetAlphabet();
    }

    console.log(JSON.stringify(alphabets))
    res.send(input);
});


export default router;
