import { Router } from "express";
var router = Router();

function generateRandomNo() {
  var min = 1;
  var max = 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.post("/", function (req, res) {
  var input = req.body;
  var basketWeight = 0;
  for (var fruit in input) {
        var currFruitCount = input[fruit]
        var currFruitWeight = generateRandomNo;
        basketWeight += currFruitCount * currFruitWeight;
  }
  res.send(basketWeight);
});

export default router;