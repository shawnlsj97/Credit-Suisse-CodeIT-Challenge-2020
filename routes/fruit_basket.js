import { Router } from "express";
var router = Router();
var weights = [1, 1, 1];

router.post("/", function (req, res) {
  var input = req.body;
  var basketWeight = 0;
  var i = 0;
  for (var fruit in input) {
    console.log(input[fruit]);
    var currFruitCount = input[fruit]
    basketWeight += currFruitCount * weights[i];
    i++;
  }
  console.log(basketWeight);
  console.log(weights);
  res.send(basketWeight.toString());
});

export default router;