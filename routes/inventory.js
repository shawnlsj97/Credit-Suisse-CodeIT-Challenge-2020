import { Router } from "express";
var router = Router();

function sort(arr) {
  arr.sort(function(a, b) {
    if (a.numOperations < b.numOperations) {
      return -1;
    } else if (a.numOperations > b.numOperations) {
      return 1;
    } else {
      if (a.original < b.original) {
        return -1;
      } else if (a.original > b.original) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}

router.post('/', function (req, res) {
  let result = [];  
  for (var i = 0; i < req.body.length; i++) {
    var name = req.body[i]["searchItemName"];
    var items = req.body[i]["items"];
    console.log(name);
    console.log(items);
    var resul = {"searchItemName":`${name}`,"searchResult":[]};
    var intermediate = [];
    for (var j in items) {
      var item = items[j];
      var r = {"fixedName": "", "numOperations": 0, "original": item};
      var x = 0;
      var y = 0;
      for (var b = 0; b < item.length; b++) {
        if (item.charAt(x).toLowerCase() == name.charAt(y).toLowerCase()) {
          r.fixedName += item.charAt(x).toLowerCase();
          x++;
          y++;
        } else if (item.charAt(y) == ' ') {
          r.fixedName += "+";
          r.fixedName += item.charAt(x).toLowerCase();
          x++;
        } else if (item.charAt(x).toLowerCase() == name.charAt(y+1).toLowerCase()) {
          r.fixedName += "-";
          r.fixedName += name.charAt(y).toLowerCase();
          r.fixedName += item.charAt(x).toLowerCase();
          x++;
          y++;
          y++;
        } else if (!name.includes(y, item.charAt(x).toLowerCase())) {
          if (item.charAt(x + 1) == " ") {
            r.fixedName += "+";
            r.fixedName += item.charAt(x).toLowerCase();
            x++;
            r.numOperations++;
          } else {
            r.fixedName += item.charAt(x).toLowerCase();
            x++;
            r.numOperations++;
          }       
        } else if (name.includes(y, item.charAt(x).toLowerCase())) {
          r.fixedName += "-";
          r.fixedName += item.charAt(y).toLowerCase();
          y++;
          r.numOperations++;
        }
      }
      intermediate.push(r);
    }
    sort(intermediate);
    console.log(intermediate);
    for (var k in intermediate) {
      var r = intermediate[k];
      resul.searchResult.push(r.fixedName);
    }
    result.push(resul);
  }
    
  console.log("My result--> %s", result);
  res.send(JSON.stringify(result));
});


export default router;
