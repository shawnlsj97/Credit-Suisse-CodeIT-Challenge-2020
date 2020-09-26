import { Router } from "express";
var router = Router();

function countMoves(arr) {
  var count = 0;
  var i = 0;
  for (i = 0; i < arr.length - 1; i++) {
    var curr = arr[i];
    var next = arr[i + 1];
    if (curr == 0 && next == 0) {
      break;
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
