import { Router } from "express";
var router = Router();
var weights = [1, 1, 2];

router.post("/", function (req, res) {
  var input = req.body;
  var basketWeight = 0;
  var i = 0;
  for (var fruit in input) {
    var currFruitCount = input[fruit]
    basketWeight += currFruitCount * weights[i];
    i++;
  }
  res.send(basketWeight.toString());
});

export default router;