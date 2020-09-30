# Clean the Floor

## Instructions

You find that cleaning the floor with the least amount of movement helps to calm your nerves. A value higher than 0 represents the dirtiness of the floor. Find out what is the least number of moves to clean the floor.

Expose a POST endpoint `/clean_floor` for us to verify!

### Input

```
{
  "tests": {
    "0": {
      "floor":[0, 1]
    },
    "1": {
      "floor":[1, 1]
    },
    ...
  }
}
```

### Output Expected

```
{
  "answers": {
    "0": 1,
    "1": 2,
    ...
  }
}
```

## Itty Bitty Details

- The start point is always at position 0 of the array
- Each move traverses 1 position in the array and performs 1 action
- There are only 2 possible actions per move:
  1. If the position has dirt level > 0 then the dirt level decreases by 1 (Spend some time and effort to clean the floor)
  2. If the position has dirt level = 0 then the dirt level increases by 1 (You walked on a clean floor so you dirty it)
- When all values in the floor have a dirt level = 0, then the floor is clean!

## Examples

### Input 1

```
[0, 1]
```

### Output 1

1 Move to clean

```
Move 0: [0, 1]
Move 1: [0, 0] // You're done cleaning!
```

### Input 2

```
[1, 1]
```

### Output 2

2 Moves to clean

```
Move 0: [1, 1]
Move 1: [1, 0]
Move 2: [0, 0] // You're done cleaning!
````

*Actual number of test cases given may change.*