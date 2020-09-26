import { Router } from "express";
var router = Router();

router.post("/", function (req, res) {
  var input = req.body;
  var numSalads = parseInt(input["number_of_salads"]);
  var saladCount = 0;
  var distanceCount = 0;
  var minDistance = Number.MAX_SAFE_INTEGER;
  var map = input["salad_prices_street_map"];
  var numRows = map.length;
  var numCols = map[0].length;
  for (var r = 0; r < numRows; r++) {
      var row = map[r];
      for (var c = 0; c <= numCols - numSalads; c++) {
          // for each entry, count down the street to check if there are sufficient salad stores to buy from
          for (var ptr = c; ptr < numCols; ptr++) {
              if (saladCount == numSalads) { // finish counting salads
                break;
              } else if (row[ptr] != "X") { // still need to count
                var currDistance = Number(row[ptr]);
                saladCount++;
                distanceCount += currDistance;
              } else { // encounter "X", meaning route is no longer consecutive
                break;
              }
          }
          if (saladCount == numSalads && distanceCount < minDistance) {
              minDistance = distanceCount;
          }
          // reset counters
          saladCount = 0;
          distanceCount = 0;
      }
  }
  if (minDistance == Number.MAX_SAFE_INTEGER) {
      minDistance = 0;
  }
  var result = { result: minDistance };
  res.send(result);
});

export default router;
