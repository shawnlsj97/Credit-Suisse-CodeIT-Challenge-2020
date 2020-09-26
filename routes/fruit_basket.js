import { Router } from "express";
var router = Router();

router.post("/", function (req, res) {
  var input = req.body;
  var basketWeight = 0;
  for (var fruit in input) {
        var currFruitCount = input[fruit]
        basketWeight += currFruitCount * 100;
  }
  res.send(basketWeight.toString());
});

export default router;