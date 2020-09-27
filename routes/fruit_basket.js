import { Router } from "express";
var router = Router();
var weights = new Map();
weights.set("maPomegranate", 52);
weights.set("maPineapple", 47);
weights.set("maAvocado", 58);
weights.set("maApple", 93);
weights.set("maWatermelon", 24);
weights.set("maRamubutan", 37);


router.post("/", function (req, res) {
  var input = JSON.parse(req.body);
  console.log(input);
  var basketWeight = 0;
  var fruit = 0;
  for (fruit in input) {
    var currFruitCount = input[fruit]
    basketWeight += currFruitCount * weights.get(fruit);
  }
  res.send(JSON.stringify(basketWeight));
});

export default router;