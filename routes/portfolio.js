import { Router } from "express";
var router = Router();
var comparisonArray = [];
var result = { "output": comparisonArray };

function roundDp(number) {
    return Math.round(number * 1000) / 1000;
}

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

router.post("/", function (req, res) {
  var input = req.body["inputs"][0];
  var portfolioData = input["Portfolio"];
  var stdDevSpotPrice = portfolioData["SpotPrcVol"];
  var indexFutures = input["IndexFutures"];
  for (let i = 0; i < indexFutures.length; i++) {
      var currIndexFuture = indexFutures[i];
      var corCoef = currIndexFuture["CoRelationCoefficient"];
      var stdDevFuturesPrice = currIndexFuture["FuturePrcVol"];
      var optimalHedgeRatio = roundDp(corCoef * (stdDevSpotPrice / stdDevFuturesPrice));
      var futuresContractSize = currIndexFuture["IndexFuturePrice"] * currIndexFuture["Notional"];
      var numFuturesContract =
        Math.round((optimalHedgeRatio * portfolioData["Value"]) / futuresContractSize);
      comparisonArray.push({ "HedgePositionName": currIndexFuture["Name"], "OptimalHedgeRatio": optimalHedgeRatio, "NumFuturesContract": numFuturesContract  });
      console.log(currIndexFuture);
  }
  comparisonArray.sort(compare);
  var outputArray = [];
  outputArray.push(comparisonArray[0]);
  result["output"] = outputArray;
  res.send(result);
});

export default router;
