import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
  console.log(req.body);
    var numBooks = req.body["numberOfBooks"];
    var numDays = req.body["numberOfDays"];
    var books = req.body["books"];
    var days = req.body["days"];
    var usedBooks = [];
    var usedDays = [];

    var i;
    var foundPartner = false;
    for (i = 0; i < parseInt(numBooks); i++) {
      if (usedBooks.includes(i)) {
        continue;
      }
      var curr = books[i];
      var j;
      for (j = 0; j < parseInt(numBooks); j++) {
        if (j == i || usedBooks.includes(j)) {
          continue;
        }
        var k;
        for (k = 0; k < parseInt(numDays); k++) {
          if (usedDays.includes(k)) {
            continue;
          }
          if (curr + books[j] < days[k]) {
            foundPartner = true;
            usedBooks.push(i);
            usedBooks.push(j);
            usedDays.push(k);
            break;
          }
        }
      }
      var best = 1000;
      if (!foundPartner) {
        // best fit algo
        for (k = 0; k < parseInt(numDays); k++) {
          if (usedDays.includes(k)) {
            continue;
          }
          if (k >= books[i] && k < best) {
            best = k;
          }
        }
        if (days.includes(best)) {
          usedBooks.push(i);
          usedDays.push(best);
        }
      }
    }
    let result = {"optimalNumberOfBooks": JSON.stringify(usedBooks.length)};
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
