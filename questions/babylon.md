# The Great Olympiad of Babylon

Created By Moin and Ryan

## Problem Statement

The city of Babylon holds a International Olympiad each year inviting intellectuals from all over the world. Arsenios hails from a small village in Macedonia and has dreamt since early childhood to be able to participate in the Olympiad, which consists of questions from every book known to mankind.

In the year 1300BC, Arsenios is finally able to make the journey to Babylon but he only has a limited number of days to prepare for the Olympiad. He would like to ask for your help in scheduling his daily reading in order to maximize his chances of winning.

As such Arsenios has figured out the amount of time he has each day up until the day of the Olympiad. He also knows the amount of time in minutes it will take him to read a particular book. He will provide you this information and would be grateful if you can help him design the optimal schedule. Since the Olympiad guarantees an equal number of questions from each book, Arsenios will be able to maximize his score simply by reading the most books he can read given the constraints. He would like to ask you to tell him how many books he would be able to read with the optimal schedule given that he has to read a book to completion on the same day that he starts reading it.

## Problem Specifications
The number of books (numberOfBooks) would always be greater than the number of days available for preparation (numberOfDays). The time required to read book i where 0 <= i < numberOfBooks to completion is going to be provided as booksi where books is a list. The time available for reading on day j where 0 <= j < numberOfDays is going to be provided as daysj where days is a list.

The result should be the number of books Arsenios can read with the optimal schedule (optimalNumberOfBooks).

Endpoint: /olympiad-of-babylon

### Input Limits

```
3 < numberOfDays <= 10
5 < numberOfBooks <= 50
80 <= days[i] <= 120 | For all i
20 <= books[i] <= 80 | For all i
```

### Input Schema
```
{
    numberOfBooks: Integer,
    numberOfDays: Integer,
    books: [Integer],
    days: [Integer]
}
```

### Output Schema
```
{
    optimalNumberOfBooks: Integer
}
```

## Examples

### Input
```
{
    numberOfBooks: 5,
    numberOfDays: 3,
    books: [114, 111, 41, 62, 64],
    days: [157, 136, 130]
}
```

### Ouput
```
{
    optimalNumberOfBooks: 5
}
```

## Potential Optimal Schedule

Day 1: Book 2 and Book 3 (111 minutes + 41 minutes = 152 minutes < 157 minutes)
Day 2: Book 4 and Book 5 (62 minutes + 64 minutes = 126 minutes < 136 minutes)
Day 3: Book 1 (114 minutes < 130 minutes)