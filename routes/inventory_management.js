import { Router } from "express";
var router = Router();
var searchItemName;
var array = [];

function matchWord(currItem);
router.post("/", function (req, res) {
  var input = req.body;
  var obj = input[0];
  searchItemName = obj["searchItemName"];
  var items = obj["items"];
  for (let i = 0; i < items.length; i++) {
      var currItem = items[i];
  } 
  res.send(input);
});

export default router;
