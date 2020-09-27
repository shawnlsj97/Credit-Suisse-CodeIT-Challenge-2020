Social Distancing
Instructions
The Singapore government has trouble deciding the limit for the number of people per train in the circuit breaker! Help them to resolve this conundrum by solving this question:

How many ways can X number of people sit in an MRT cabin with Y number of seats given that there is a required safety distance of Z seats?

Note: The order of the people do not matter.

Expose a POST endpoint /social_distancing for us to verify!

Input
{
    "tests": {
        "0": {
            "seats": 8,
            "people": 3,
            "spaces": 1
        },
        "1": {
            "seats": 7,
            "people": 3,
            "spaces": 1
        },
        "2": {
            "seats": 6,
            "people": 2,
            "spaces": 2
        },
        ...
    }
}
Output Expected
{
    "answers": {
        "0": 20,
        "1": 10,
        "2": 6,
        ...
    }
}
Example
Given that seats = 6, people = 3, spaces = 1
Expected Answer: 4
Explanation
S denotes an empty seat and P denotes a person sitting on a seat

Note: The order of the people do not matter.

Ways	S1	S2	S3	S4	S5	S6
1	P	S	P	S	P	S
2	P	S	P	S	S	P
3	P	S	S	P	S	P
4	S	P	S	P	S	P
Actual number of test cases given may change.