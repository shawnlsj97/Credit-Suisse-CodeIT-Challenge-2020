import { Router } from "express";
var router = Router();

function countMoves(arr) {
  var count = 0;
  var i = 0;
  for (i = 0; i < arr.length - 1; i++) {
    var curr = arr[i];
    var next = arr[i + 1];
    if (curr == 0 && next == 0 && i == arr.length - 2) {
      break;
    } else if (curr != 0) {
      if (next == 0) {
        arr[i + 1] = arr[i + 1] + 1;
      } else {
        arr[i + 1] = arr[i + 1] - 1;
      }
      count++;
      arr[i] = arr[i] - 1;
      count++;
      i--;
    } else {
      // curr == 0
      if (next != 0 && i == arr.length - 2) {
        while (arr[i + 1] != 0) {
          arr[i + 1] = arr[i + 1] - 1;
          count++;
          if (arr[i + 1] == 0 && arr[i] == 0) {
            break;
          } else {
            if (arr[i] == 0) {
              arr[i] = arr[i] + 1;
              count++;
            } else {
              arr[i] = arr[i] - 1;
              count++;
            }
          } 
        }
        if (arr[i] != 0) {
          arr[i] = arr[i] - 1;
          count++;
        }
        
      } else if (next != 0) {
        arr[i + 1] = arr[i + 1] - 1;
        count++;
      } else {
        arr[i + 1] = arr[i + 1] + 1;
        count++;
      }
    }
  }
  return count;
}

router.post('/', function (req, res) {
    var input = req.body['tests'];
    console.log(input);
    var result = {"answers": {}};
    
    var i = 0;
    for (i in input) {
      result.answers[`${i}`] = countMoves(input[i]['floor']);
    }
    console.log("My result--> %s", result['answers']);
    res.send(result);
});


export default router;
