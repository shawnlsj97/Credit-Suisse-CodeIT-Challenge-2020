import { Router } from "express";
var router = Router();
var comparisonArray = [];
var result = { "outputs": comparisonArray };

/**
 * Round to nearest 3 d.p.
 * @param {Number} number 
 */
function roundDp(number) {
    return Math.round(number * 1000) / 1000;
}

/**
 * Compares 2 Index Futures
 * @param {First} a 
 * @param {Second} b 
 */
function compare(a, b) {
  if (a.NumFuturesContract < b.NumFuturesContract) {
    return -1;
  } else if (a.NumFuturesContract > b.NumFuturesContract) {
    return 1;
  } else if (a.OptimalHedgeRatio < b.OptimalHedgeRatio) {
    return -1;
  } else if (a.OptimalHedgeRatio > b.OptimalHedgeRatio) {
    return 1;
  }
  return 0;
}

/**
 * If current index future is "better" than existing one, replace it
 * @param {Object} currIndexFuture 
 */
function compareIndexFuture(currIndexFuture) {
    if (comparisonArray.length == 0) {
        comparisonArray.push(currIndexFuture);
    } else if (compare(currIndexFuture, comparisonArray[0]) < 0) {
        comparisonArray.pop();
        comparisonArray.push(currIndexFuture);
    }
}

router.post("/", function (req, res) {
  var finalArr = [];
  console.log(req.body["inputs"]);
  for (var record in req.body["inputs"]) {
    var input = req.body["inputs"][record];
    var portfolioData = input["Portfolio"];
    var stdDevSpotPrice = portfolioData["SpotPrcVol"];
    var indexFutures = input["IndexFutures"];
    for (let i = 0; i < indexFutures.length; i++) {
        var currIndexFuture = indexFutures[i];
        console.log(currIndexFuture);
        var corCoef = currIndexFuture["CoRelationCoefficient"];
        var stdDevFuturesPrice = currIndexFuture["FuturePrcVol"];
        var optimalHedgeRatio = roundDp(corCoef * (stdDevSpotPrice / stdDevFuturesPrice));
        var futuresContractSize = currIndexFuture["IndexFuturePrice"] * currIndexFuture["Notional"];
        var numFuturesContract = Math.round((optimalHedgeRatio * portfolioData["Value"]) / futuresContractSize);
        var currResult = {
            HedgePositionName: currIndexFuture["Name"],
            OptimalHedgeRatio: optimalHedgeRatio,
            NumFuturesContract: numFuturesContract,
          };
        compareIndexFuture(currResult);
    }
    console.log("pushed");
    finalArr.push(comparisonArray[0]);
    comparisonArray = [];
  }
  result["outputs"] = finalArr;
  console.log(`final array: ${finalArr}`);
  console.log(`results: ${result}`)
  res.send(result);
});

export default router;
