import { Router } from "express";
var router = Router();

router.post("/", function (req, res) {
  var input = req.body['input'];
  var numSalads = parseInt(input["number_of_salads"]);
  var saladCount = 0;
  var distanceCount = 0;
  var minDistance = Number.MAX_SAFE_INTEGER;
  var map = input["salad_prices_street_map"][0];
  var numRows = map.length;
  var numCols = map[0].length;
  for (var r = 0; r < numRows; r++) {
      var row = map[r];
      for (var c = 0; c < numCols; c++) {
          for (var ptr = c; ptr < numCols; c++) {
              // if ptr counts finish num salads then break
              if (saladCount == numSalads) { // finish counting salads
                  break;
              } else if (row[ptr] != "X") {
                  saladCount++;
                  distanceCount += row[ptr];
              }
          }
          if (saladCount == numSalads && distanceCount < minDistance) {
              minDistance = distanceCount;
          }
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
