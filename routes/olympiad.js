import bodyParser from "body-parser";
import { Router } from "express";
var router = Router();

router.post('/', function (req, res) {
  console.log(req.body);
    var numBooks = req.body["numberOfBooks"];
    var numDays = req.body["numberOfDays"];
    var books = req.body["books"].sort();
    var days = req.body["days"].sort();
    var usedBooks = [];
    var usedDays = [];

    var i;
    var foundPartner = false;
    for (i = 0; i < parseInt(numBooks); i++) {
      if (usedBooks.includes(books[i])) {
        continue;
      }
      var curr = books[i];
      var best_partner = -1;
      var best_day = 1000;
      var j;
      for (j = parseInt(numBooks) - 1; j >= 0; j--) {
        if (j == i || usedBooks.includes(books[j])) {
          continue;
        }
        var k;
        for (k = parseInt(numDays - 1); k >= 0; k--) {
          if (usedDays.includes(days[k])) {
            continue;
          }
          if (curr + books[j] < days[k]) {
            foundPartner = true;
            if (books[j] > best_partner) {
              best_partner = books[j];
            }
            if (days[k] < best_day) {
              best_day = days[k];
            }
            break;
          }
        }
        if (foundPartner) {
          break;
        }
      }
      if (foundPartner) {
        if (days.includes(best_day) && books.includes(books[i]) && books.includes(best_partner)) {
          usedBooks.push(books[i]);
          usedBooks.push(best_partner);
          usedDays.push(best_day);
        }
      }
      var best = 1000;
      if (!foundPartner) {
        // best fit algo
        for (k = 0; k < parseInt(numDays); k++) {
          if (usedDays.includes(days[k])) {
            continue;
          }
          if (days[k] >= books[i] && days[k] < best) {
            best = days[k];
          }
        }
        if (days.includes(best)) {
          usedBooks.push(books[i]);
          usedDays.push(best);
        }
      }
    }
    let result = {"optimalNumberOfBooks": JSON.stringify(usedBooks.length)};
    console.log("My result--> %s", result);
    res.send(result);
});


export default router;
