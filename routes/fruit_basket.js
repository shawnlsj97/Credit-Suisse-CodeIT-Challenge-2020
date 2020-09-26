import { Router } from "express";
var router = Router();
var weights = [1, 1, 1];

router.post("/", function (req, res) {
  var input = req.body;
  console.log(req.body);
  var basketWeight = 0;
  var i = 0;
  var fruit = 0;
  for (fruit in input) {
    var currFruitCount = input[fruit]
    basketWeight += currFruitCount * weights[i];
    i++;
  }
  console.log(basketWeight);
  console.log(weights);
  res.send(JSON.stringify(basketWeight));
});

export default router;