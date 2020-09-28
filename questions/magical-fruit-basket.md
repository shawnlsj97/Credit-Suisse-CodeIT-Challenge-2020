# Magical Fruit Basket

Mafrba, the magical fruits seller is holding a competition to find the best estimator in town.

The challenge is to guess the exact weight for a given basket of fruits.

The closer you are, the more points you get!

In a magical fruit basket, there can be up to 3 kinds of fruits where it can contain 1 to 100 of each kind.

At the start of every hour, the weight for each kind of fruit is randomly generated, set between 1 to 100 grams, inclusive.

For example, for a magical fruit basket of 1 maApple, 2 maWatermelons, and 3 maBanana, the sample input is given below.

###  Sample Input

`{ "maApple": 1, "maWatermelon": 2, "maBanana": 3 }`

The expected output would be the guessed weight in grams, no decimal places.

So, if your guess is that maApple is 10g, maWatermelon is 20g, and maBanana is 30g.

Your final guess for the basket of fruits should be 1\*10 + 2\*20 + 3\*30 = 140g

### Sample Expected Output

`140`

After you have made your guess, Mafrba will place the basket on the magic weighing scale.

Then, you will be updated through telepathy(your group's dashboard), how far your guess was from the actual weight of the magical fruit basket rounded to the nearest 100 grams.

Your final guess for the basket of fruits should be 1\*10 + 2\*20 + 3\*30 = 140g

For example:

If the actual weight of the magical fruit basket is 190g:

- Your guess is 140g, you will see that your guess is 100g away, rounded up from 50g.
- Your guess is 200g, you will see that your guess is 0g away, rounded down from 10g.

Do note that you will only get the full score if you guess the exact weight(whole number)

## Requirements

Expose 1 POST endpoint `/fruitbasket` for evaluation