import { Router } from "express";
var router = Router();
var outputArray = [];
var result = { "output": outputArray };

function roundDp(number) {
    return Math.round(number * 1000) / 1000;
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
      outputArray.push({ "HedgePositionName": currIndexFuture["Name"], "OptimalHedgeRatio": optimalHedgeRatio, "NumFuturesContrac": numFuturesContract  });
      console.log(currIndexFuture);
  }
  result["output"] = outputArray;
  res.send(result);
});

export default router;
