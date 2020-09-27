GMO Engineering for a Sustainable Food Supply
The world is facing a food supply crisis!

In order to ensure sustainable and self-sufficient food supply, you are tasked to lead the national food council to increase the yield of crops by increasing its drought-resistance index (DRI) through genome sequencing.

A higher DRI would indicate higher survivability of the crop, increasing the yield of the crops.

A genome sequence is made up of exactly four alphabetical characters: A, C, G, T.

Task
Re-arrange the input sequences given in a way such that the DRI is maximized, to improve the crops' DRI.

To calculate the DRI of the crop, we will be calculating according to the following rules:

A triple of A (AAA) will deduct the DRI by 10 points. So AAAAAA will reduce DRI by 20 points.

Every contiguous set of ACGT will increase the DRI by 15 points

A pair of CC will increase the DRI by 25 points.

So CCCC will increase DRI by 50 points.

Combination pairs of overlapping sequences will not be awarded double points i.e. AAACGT will not qualify for -10 (AAA) and +15 (ACGT)

Take note, in this case, AAA will be first used to qualify for -10 and it cannnot be used in the computation of ACGT. Thus, the score for AAACGT will be -10 instead of a total of +5 (-10 + 15)

The score of DRI starts from 0, and can be negative/positive. Of course, the more positive the DRI score, the better the crop.

Examples
Please note that the following examples are NOT optimal. They are meant to show DRI score calculations only.

Example 1
Input:  AAACCCAAAGGTTACTGAAAAG
Output: AAGAAGAAGAAGAATATTCCCC
Explanation for example 1 This output will give us a DRI score of 50.

How is the DRI score tabluated:

There is no occurence of AAA in the output, therefore, the DRI score is not deducted.
There is no ACGT in the output, therefore the DRI score is not increased.
There are 2 occurences of CC in the output, therefore, the DRI score is increased by 50 points.
Output DRI Score : 0 x -20 + 0 x 15 + 2 x 25 = 50
Example 2
Input:  AAAAAACCTTTGGGGGGGTTTT
Output: AGAGAGAGAGAGCCTTTTTTTG
Explanation for example 2 This output will give us a DRI score of 25.

How is the DRI score tabluated:

There is no occurence of AAA in the output, therefore, the DRI score is not deducted.
There is no ACGT in the output, therefore the DRI score is not increased.
There is 1 occurence of CC in the output, therefore, the DRI score is increased by 25 points.
Output DRI Score : 0 x -20 + 0 x 15 + 1 x 25 = 25
API
Please expose a POST endpoint /intelligent-farming for us to verify.

Additionally, please ensure that your response sets the HTTP header Content-Type to application/json. If this is not done, the evaluation call will fail.

Input and Output Schema
The input and output JSON schemas are exactly the same. Simply put, mutate only the gene sequence content and return the same data structure.

Do NOT change the values of the runId and the id shown in the schema below, doing so will result in submission failure.

Do NOT change the length of the geneSequence, doing so will result in submission failure.

Do NOT change the proportion of genes in the gene sequences, doing so will result in submission failure.

E.g. Input gene sequence = AAAA, and output gene sequence = ACGT

There will be exactly 10 gene sequences given to you. You must submit back 10 gene sequences, while not changing the value of id as mentioned in point 1. Any fewer or any more gene sequences returned will result in submission failure.

{
    "runId": String <- Do NOT Change
    "list": [
        {
            "id": Integer, <- Do NOT Change
            "geneSequence": String <- Mutate this
        },
        ...
    ]
}
Sample Input and Output
{
    "runId": "a8098c1a-f86e-11da-bd1a-00112444be1e"
    "list":[
        { "id": 1, "geneSequence": "ACGT" },
        { "id": 2, "geneSequence": "ACGT" },
        { "id": 3, "geneSequence": "ACGT" },
        { "id": 4, "geneSequence": "ACGT" },
        { "id": 5, "geneSequence": "ACGT" },
        { "id": 6, "geneSequence": "ACGT" },
        { "id": 7, "geneSequence": "ACGT" },
        { "id": 8, "geneSequence": "ACGT" },
        { "id": 9, "geneSequence": "ACGT" },
        { "id": 10, "geneSequence": "ACGT" }
    ]
}
Contacts
Tan Chee Wei
Jerald Gan
Louis Lim
Don't forget to save the Earth!