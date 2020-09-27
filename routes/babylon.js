import { Router } from "express";
var router = Router();

var books;
var days;
var pairOneValue;
var pairTwoValue;
var pairDayIndex;
var lowestDiff;
var bookCount = 0;

function reset() {
    pairOneValue = -1;
    pairTwoValue = -1;
    pairDayIndex = -1;
    lowestDiff = Number.MAX_SAFE_INTEGER;
}

router.post("/", function (req, res) {
  var input = req.body;
  var numBooks = input["numberofBooks"];
  var numDays = input["numberOfDays"];
  books = input["books"];
  days = input["days"];
  pairOneValue = -1;
  pairTwoValue = -1;
  pairDayIndex = -1;
  lowestDiff = Number.MAX_SAFE_INTEGER;
  while (books.length >= 2 && days.length >= 1) { // finding optimal pair
      for (let i = 0; i < books.length; i++) { // book pair 1
        for (let j = 0; j < books.length; j++) { // book pair 2
          if (i != j) { // avoid pairing book with itself
            var pairSum = books[i] + books[j];
            for (let k = 0; k < days.length; k++) { // day loop
              var currRemainder = days[k] - pairSum;
              if (currRemainder >= 0 && currRemainder < lowestDiff) {
                pairOneValue = books[i];
                pairTwoValue = books[j];
                pairDayIndex = k;
                lowestDiff == currRemainder;
              }
            }
          }
        }
      }
      if (pairOneValue != -1 && pairTwoValue != -1) {
            bookCount += 2;
            var pairOneIndex = books.indexof(pairOneValue);
            books.splice(1, pairOneIndex);
            var pairTwoIndex = books.indexof(pairTwoValue);
            books.splice(1, pairTwoIndex);
            days.splice(1, pairDayIndex);
            reset();
      } else { // cannot assign in pairs
        break;
      }
  }

  res.send(result);
});

export default router;

/*
{
    numberOfBooks: 5,
    numberOfDays: 3,
    books: [114, 111, 41, 62, 64],
    days: [157, 136, 130]
}
*/