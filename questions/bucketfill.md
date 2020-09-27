# Bucket Fill

You are given a 2D graph of some water sources, buckets and pipes in SVG format. Water will flow vertically downwards from the water source(s) to the bottom of the SVG. Along its way down, it fills up the buckets or gets redirected by the pipes.

Your task is to calculate the total area of buckets that will be filled with water.

## Requirement
- Expose a POST method with endpoint `/bucket-fill`.
- This endpoint should accept `Content-Type: image/svg+xml`.
- It should return a body with `Content-Type: application/json.`

## Input
Note: There will be varying difficulties, the numbers indicated below is for the maximum difficulty.

- SVG will be in a maximum size of 2048x2048.
- Co-ordinates will always be in integers.
- Water is denoted as `<circle/>` in the SVG.
- A pipe or bucket is denoted as `<polyline/>` in the SVG.
- 2 ≤ Number of Buckets ≤ 64
- 1 ≤ Number of Pipes ≤ 64

### Sample Input:

```
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="1024">
        <circle cx="500" cy="0" r="1" stroke="blue" fill="none" />
        <polyline fill="none" stroke="black" points="360,175 360,225 400,225 400,175" />
        <polyline fill="none" stroke="black" points="480,5 480,40 520,40 520,5" />
        <polyline fill="none" stroke="black" points="500,50 400,150" />
    </svg>
```
                
You may view above svg [here](https://cis2020-bucket-fill.herokuapp.com/sample.svg).

## Output
Expected json result should be in this format: `{ result: <THE_NUMERIC_ANSWER_HERE> }`.

### Sample Output:

```         
    {
        result: 3315
    }
```
                
### Explanation:
- There is one water source at `(500, 0)`.
- There is a bucket bounded by the top left corner `(480, 5)` and bottom right corner `(520, 40)`, which has an area of `1365`.
- There is another bucket bounded by the top left corner `(360, 175)` and bottom right corner `(400, 225)`, which has an area of `1950`.
- Finally, there is a pipe that starts at `(500, 50)` and ends at `(400, 150)`.
- Since the water source will fill the first bucket, and then the second one with the help of the pipe, the answer for this 2D graph is `3315`.

## Scoring Guideline
Your result will only be scored if it is within 50% or 200% of the expected answer. In other words, you will get some score if you get close enough.

## Assumptions
- All elements in SVG will have a line thickness of 1px.
- There is at least one water source and either a bucket or pipe given in the SVG file. From the SVG perspective, that means there is at least one `<circle/>` and one `<polyline/>` element.
- Water sources have an infinite amount of water.
- Pipes are diagonal bounded by a square, and will always have a tangent of 1 or -1.
- For a pipe to redirect, the water stream must either hit along the length or the starting top.
- Water that enters from any segment of a pipe will come out below the last unit.
  - For example, a pipe ending at `(50, 50)` will redirect water to the point `(50, 51)`.
- A bucket may be inside another bucket such that they are either aligned at the top or one enclosing the other completely.
- No bucket will be partially contained in another bucket.
- Overflowing of buckets will happen when the bucket is filled up, and is only possible if its corner's above and diagonals are unobstructed.
  - Using the ASCII art below as an illustration, the middle bucket with water ~ will overflow as the points marked `@` are unobstructed, with water . flowing downwards.
  
```
x x     x x
xxx     xxx
  @@@  @@@
  .x~~~~x.
  .xxxxxx.
```

- If a stream hits a bucket's corner, the stream will fill the bucket and overflow it.
- No shapes will cross another.
  - A bucket may encroach into the square boundaries of a pipe, but not block the path.
  - A pipe will not enter the inside of a bucket, so it may only start or end at the top of the bucket.
  
- Do not include water that look like they might be trapped in between buckets or pipes, we only need the area of buckets that will be filled
  - For example, the area marked `!` below should not be included, and should only count those marked in `~`.

```
 .      .
..... .....
.x~x!!!x~x.
.xxx!!!xxx.
. x~~~~~x .
. xxxxxxx .
```