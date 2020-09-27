import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var name = req.body[0]["searchItemName"];
    var items = req.body[0]["items"];
    console.log(name);
    console.log(items);
    let result = [{"searchItemName":`${name}`,"searchResult":[]}];
    for (var i in items) {
      var item = items[i];
      console.log(item);
      var fixedName = "";
      for (var j = 0; j < item.length; j++) {
        if (item.charAt(j) == name.charAt(j)) {
          fixedName += item.charAt(j);
        } else if (item.charAt(j) == name.charAt(j + 1)) {
          fixedName += "-";
          fixedName += name.charAt(j);
        } else if (item.charAt(j + 1) == name.charAt(j + 1)) {
          fixedName += item.charAt(j);
        } else {
          fixedName += "+";
          fixedName += item.charAt(j);
        }
      }
      result[0].searchResult.push(fixedName);
    }
    console.log("My result--> %s", result);
    res.send(JSON.stringify(result));
});


export default router;
