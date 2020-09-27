import { Router } from "express";
var router = Router();
var result = { optimalNumberOfBooks: 0 };

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
                console.log(
                  `pairing ${pairOneValue} with ${pairTwoValue} on ${days[pairDayIndex]}`
                );
                lowestDiff = currRemainder;
              }
            }
          }
        }
      }
      if (pairOneValue != -1 && pairTwoValue != -1) {
            bookCount += 2;
            var pairOneIndex = books.indexOf(pairOneValue);
            books.splice(1, pairOneIndex);
            var pairTwoIndex = books.indexOf(pairTwoValue);
            books.splice(1, pairTwoIndex);
            var currDay = days[pairDayIndex];
            currDay = lowestDiff;
            if (lowestDiff == 0) {
                days.splice(1, pairDayIndex);
            } else {
                days[pairDayIndex] = currDay;
            }
            reset();
      } else { // cannot assign in pairs, need to assign individually
        break;
      }
  }
  reset();
  while (days.length != 0 && books.length != 0) {
      for (let i = 0; i < books.length; i++) {
          for (let j = 0; j < days.length; j++) {
              var currRemainder = days[j] - books[i];
              if (currRemainder >= 0 && currRemainder < lowestDiff) {
                  pairOneValue = books[j];
                  pairDayIndex = days[j];
                  lowestDiff = currRemainder;
              }
          }
      }
      if (pairOneValue != -1) {
          bookCount++;
          var pairOneIndex = books.indexOf(pairOneValue);
          books.splice(1, pairOneIndex);
          days.splice(1, pairDayIndex);
          reset();
      } else {
          break;
      }
  }
  result["optimalNumberOfBooks"] = bookCount;
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