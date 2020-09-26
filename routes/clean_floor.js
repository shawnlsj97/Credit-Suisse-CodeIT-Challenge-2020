import { Router } from "express";
var router = Router();

function countMoves(arr) {
  var count = 0;
  var i = 0;
  for (i = 0; i < arr.length; i++) {
    ptr = i;
    var curr = arr[i];
    var next = arr[i + 1];
    while (curr > 0) {
      arr[i + 1] = arr[i + 1] - 1;
      count++;
      arr[i] = arr[i] - 1;
      count++;
    }
  }
  return count;
}

router.post('/', function (req, res) {
    var input = req.body['tests'];
    
    var result = {"answer": {}};
    
    var i = 0;
    for (i in input) {
      console.log(input[i]['floor']);
      result.answer[`${i}`] = countMoves(input[i]['floor']);
    }
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
