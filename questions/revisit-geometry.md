# Revisit Geometry

You are given coordinates of a shape and straight line. Your task is to find out all the possible points of intersection.

## Requirements

- Expose a POST method with endpoint `/revisitgeometry`
- Return output result as json
  
## Constraints
- Input will be a JSON object of shape and line coordinates.
- Join the coordinates in the same order of input.
- Use straight lines to form the shape.
- Input line will not overlap with any of the lines of the shape resulting in infite points of intersection.
- n is an integer specifying the number of coordinates. 1 <= n <= 100.
- The challenge is calibrated to a precision of .01

## Input description

Use straight line to join the co-ordinates and form the shape.

Please join the coordinates in the same order of input and ensure that the last and first co-ordinate are joined by a line to complete the shape.

**Note**: Shape must remain fixed, but you can extrapolate the straight line in any direction for infinite length to find the points of intersection. If the shape and straight line do not intersect, return an empty array [].
The HTTP POST request will come with a body of Content-Type: application/json

## Scenario 1

### Sample input JSON

```
{
  "shapeCoordinates": [
    { "x": 21, "y": 70 },
    { "x": 72, "y": 70 },
    { "x": 72, "y": 127 }
  ],
  "lineCoordinates": [
    { "x": -58, "y": 56 },
    { "x": -28, "y": 68 }
  ]
}
```

### Sample output JSON

```
[
  { "x": 72, "y": 108 },
  { "x": 45.52, "y": 97.41 }
]
```

## Scenario 2

### Sample input JSON

```
{
  "shapeCoordinates": [
    { "x": -21, "y": -18 },
    { "x": 71, "y": -18 },
    { "x": 71, "y": 71 },
    { "x": -21, "y": 71 }
  ],
  "lineCoordinates": [
    { "x": 68, "y": -8 },
    { "x": 108, "y": 42 }
  ]
}
```

### Sample output JSON

```
[
  { "x": 60, "y": -18 },
  { "x": 71, "y": -4.25 }
]
```

## Scenario 3

### Sample input JSON

```
{
      "shapeCoordinates":[
         {
            "x":63,
            "y":26
         },
         {
            "x":115,
            "y":26
         },
         {
            "x":115,
            "y":54
         },
         {
            "x":63,
            "y":54
         }
      ],
      "lineCoordinates":[
         {
            "x":-88,
            "y":85
         },
         {
            "x":-58,
            "y":97
         }
      ]
   }
```

### Sample output JSON

```
[]
```