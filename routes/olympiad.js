import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
    var numBooks = req.body["numberofBooks"];
    var numDays = req.body["numberOfDays"];
    var books = req.body["books"];
    var days = req.body["days"];
    var usedBooks = [];
    var usedDays = [];

    var i;
    for (i = 0; i < numBooks; i++) {
      if (usedBooks.includes(i)) {
        continue;
      }
      var curr = books[i];
      var j;
      for (j = 0; j < numBooks; j++) {
        if (j == i || usedBooks.includes(j)) {
          continue;
        }
        var foundPartner = false;
        var k;
        for (k = 0; k < numDays; k++) {
          if (usedDays.includes(k)) {
            continue;
          }
          if (curr + books[j] < days[k]) {
            foundPartner = true;
            usedBooks.push(i);
            usedBooks.push(j);
            usedDays.push(k);
          }
        }
        var best = 1000;
        if (!foundPartner) {
          // best fit algo
          for (k = 0; k < numDays; k++) {
            if (usedDays.includes(k)) {
              continue;
            }
            if (k >= books[j] && k < best) {
              best = k;
            }
          }
        }
        usedBooks.push(j);
        usedDays.push(best);
      }
    }
    let result = JSON.stringify(usedBooks.length);
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
