# Bored Scribe

Amelia is a scribe. She was told that during this period where COVID-19 was rampant in the society, she had to take unpaid leaves. In order to maintain her typing skills, she chose to copy huge chunks of passages online. Nonetheless, it took her just one day before she got bored.

As a result, she chose to do something else altogether, something that would force her to type things that were foreign to her just so she could hone her skills - and one way would be to type everything out in reverse. As she typed, she realized that some sequences were actually similar to what she had typed before! Intrigued, she decided to do a little more research, and that eventually led to an entirely new domain she had never seen before - encryption!

Hence, she decided to do something fun. She merged the two ideas together before coming out with a little puzzle for challengers to solve. Plucking off random paragraphs online, she made them lower-cased before finding the longest palindrome and all sub-palindromes that existed in the text with length greater than or equal to two. She then used a simple caesar cipher to encrypt those paragraphs, shifting each character by the sum of each ASCII character code of the longest palindrome with the number of sub-palindromes. She would then repeat this process a few times before giving out the encrypted text for the challengers to decrypt. If the text does not contain any palindrome, the ASCII character code of the first character in the text is used for the caesar cipher shift.

Your task now is to decrypt the text back to its original form

## Task Objective

Provide an endpoint `/bored-scribe`

## Constraints

- 200 entries

## Input format

The input given is in the form of a json array.

### Sample Input
`[ { "id": 1, "encryptedText": "oxzbzxofpxkbkdifpemxifkaoljb" } ]`

### Sample Output
`[ { "id": 1, "encryptionCount": 1, "originalText": "racecar is an english palindrome" } ]`

## Explanation of encryption
- There are 4 number of palindromic substrings with length greater than or equal to 2: cec, aceca, racecar, nen
- The longest palindrome within the sentence is racecar
- Adding up the ASCII character codes of racecar: `114 + 97 + 99 + 101 + 99 + 97 + 114 = 721`
- We sum the two numbers to get value: `4 + 721 = 725`.
- The original text undergoes caesar cipher with a shift of the above value, `725` to get the encrypted code: `oxzbzxofpxkbkdifpemxifkaoljb`

Hint 1: The encrypted text strips away all spaces. However, the unencrypted text should be in the form of an English sentence without punctuations.

Hint 2: How do we differentiate racecar and race car in the original text? See hint 3

Hint 3: `xntlhfgsvzmssndloknxaqtsdenqbdenqsgnrdbzrdr`

## Scoring
- Full score rewarded if both encryption count and original text are correct. (Complete Solution)
- Partial score of `30%` given if both encryption count and original text without spacing stripped are correct. (Incomplete Solution)

| Solutions  | Points Awarded | Code                                                                                  | Explanation                                                                                                                |   |
|------------|----------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|---|
| Solution 1 | 1              | { "id": 1, "encryptionCount": 1, "originalText": "racecar is an english palindrome" } | Complete solution                                                                                                          |   |
| Solution 2 | 0.3            | { "id": 1, "encryptionCount": 1, "originalText": "racecarisanenglishpalindrome" }     | Incomplete solution, only encryption count and original text without spacing stripped correct, hence partial score awarded |   |
| Solution 3 | 0              | { "id": 1, "encryptionCount": 2, "originalText": "racecarisanenglishpalindrome" }     | Encryption count is incorrect, hence zero score awarded                                                                    |   |

- **Important Note**: Partial scores will only be awarded if more than half of the questions are solved (Complete or Incomplete Solutions).
  
Out of `200` questions:

| No. of Incomplete solutions | No. of Complete solutions | Total Score | Reason                                  |
|-----------------------------|---------------------------|-------------|-----------------------------------------|
| 80                          | 0                         | 0           | Less than half the questions solved     |
| 80                          | 49                        | 24.5        | ( 49 * 100% ) / 200 * 100%              |
| 80                          | 20                        | 22          | ( 80 * 30% + 20 * 100% ) / 200 * 100%   |
| 100                         | 100                       | 65          | ( 100 * 30% + 100 * 100% ) / 200 * 100% |