# Cluster

Given an area (2D array of '1's, '0s' and '*'s) at a specific time snapshot, you are tasked to find the number of clusters.

'1' represents an infected individual who has the ability to transmit the virus.

'0' represents an uninfected individual who can be infected by an infected person . If infected, this individual has the ability of an infected individual, and transmit the virus.

'*' represents a space where there are no individuals.

The virus can be transmitted horizontally, vertically and diagonally by a distance of 1 in the area.

A cluster is formed if there are infected individuals, or if there are virus transmissions between infected individuals and non-infected individuals.

You can assume the area is always made up by a constant length and breadth and can disregard anything beyond the given area. Individuals are also static and cannot move.

## Constraints

3 <= length of area <= 1000

3 <= breadth of area <= 1000

### Sample Input 1

```
  [
    ["*", "*", "*", "*"],
    ["*", "1", "*", "*"],
    ["*", "*", "*", "*"],
    ["*", "*", "*", "1"],
    ["*", "*", "*", "*"]
  ]
```

### Sample Output 1

```
{
  "answer": 2
}
```

### Sample Input 2

```
  [
    ["*", "*", "*", "*"],
    ["*", "1", "0", "*"],
    ["*", "*", "*", "*"],
    ["*", "*", "0", "0"],
    ["*", "*", "*", "*"]
  ]
```

### Sample Output 2

```
{
  "answer": 1
}
```

### Sample Input 3

```
  [
    ["*", "*", "*", "*"],
    ["*", "1", "0", "*"],
    ["*", "*", "*", "1"],
    ["*", "*", "0", "0"],
    ["*", "*", "*", "*"]
  ]
```

### Sample Output 3

```
{
  "answer": 1
}
```

### Sample Input 4

```
  [
    ["1", "0", "*", "*"],
    ["0", "0", "*", "0"],
    ["*", "*", "0", "*"],
    ["*", "*", "*", "*"],
    ["*", "*", "*", "*"],
    ["*", "0", "0", "*"]
  ]
```

### Sample Output 4

```
{
  "answer": 1
}
```

### Sample Input 5

```
  [
    ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "0", "0", "0", "*", "*", "*", "*", "*"],
    ["*", "*", "1", "*", "*", "*", "*", "*", "*"],
    ["*", "0", "0", "0", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "0", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "0", "0", "*", "*"],
    ["*", "*", "*", "*", "1", "*", "*", "*", "0"],
    ["*", "*", "*", "*", "0", "*", "*", "0", "0"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "1", "0", "0", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*"]
  ]
```

### Sample Output 5

```
{
  "answer": 2
}
```

## Evaluation

Your solution will be run against multiple random test cases. Be sure to include corner cases.

## Requirements

Expose 1 POST endpoint `/cluster` for evaluation