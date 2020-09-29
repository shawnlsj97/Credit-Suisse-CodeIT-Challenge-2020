# Introduction to "swaps"

In investment banks we sell a lot of financial products. One type of financial product we sell is called "swaps". A swap allows a client to bet on an asset (e.g. stocks) without actually having to buy them. This is sometimes attractive to the client because the commission rates of buying a swap can be lower than buying the actual assets from an exchange.

Let's look at some examples.

If a client buys one unit of *long* swap on HSBC stock (0005.HK), after an agreed date, if HSBC's stock goes up $1, we need to pay our client $1. If the stock goes down $1, our client will need to pay us $1. This works as if the client is holding 1 unit of HSBC stock.

There are also *short* swaps, which is the opposite of long swaps. If a client buys one unit of *short* swap on HSBC stock (0005.HK), after an agreed date, if HSBC stock goes up $1, our client needs to pay us $1. If HSBC stock goes down $1, we need to pay our client $1. This works as if the client is holding -1 one unit of HSBC stock.

## Background

When we sell swaps, we are exposed to market risks since we can potentially lose money to our clients depending on the market. As an investment bank, we only want to make money from commissions and we don't want to be affected by market volatility. As a result, we need to hedge our risk (i.e. to decrease our risk).

One way of hedging our risk is whenever a client buys HSBC swaps from us, we go to the market and buy actual HSBC stocks. In this way, no matter if the price goes up or down, we don't make/lose money. Instead, we just earn money from the commissions of selling swaps to our clients.

So an ideal case would be: Client buy or sell X amount of Swap -> We go to market to buy or sell the same amount of underlying stock -> we earn commission :D But then there are also some cases when a client buy a swap, and another client short a swap, then the client are flat and we are not in risk anyway. Or a client buy some swap, and sell them back in a very short time. There's no point of us buying stock and sell them at such short time, we can save the cost in the transaction and earn more money! So here we need to figure out given the current market situation and client behavior, when we should hedge? We will do some simulation for your strategy. The criteria will include the total Profit and Loss (PnL) and the variance of it as an estimation of total market risk exposure. Here you are the trader and will be given the client order, and the current bid and ask of the underlying, and finally respond with how much you want to hedge at this time.

### Here are some setting

Please expose an endpoint `/swaphedge` so that the server can ping and give incoming ticks. All input data and assumed return data are all in JSON format.

Every day has 30 time unit, so you will get 31 http request including the initialization. At the end of the day (EOD), both your position and client's position need to be zero, and the balance will be used to calculate PnL. Note that for each trade you make, you need to pay 0.1% of stamp duty, so frequent trading might not be the most ideal solution!

## Evaluation

As a sell side, we hope to be risk neutral, which mean regardless of the market condition, we hope to make constant profit from this business. Therefore the algorithm will be evaluated by the PnL compared to the client. The metrics will include both average and standard deviation of PnL difference. An algorithm that gives great PnL but having a huge volatility means it bring a lot of risks to the bank and hence might not be regarded as the optimal solution.

if through out the day, the client PnL is : [0, 1, 3] while our hedging PnL is [0, 1, 2], the mean and std wold be computed from the net PnL dataset : [0-0, 1-1, 2-3], which is equal to [0, 0, -1]. The mean and std of this array would be compared to that from the benchmark algorithm. Therefore, you not only want to make as much money as your client, but also avoid taking too much risk so that your portfolio is too volitile.

### The request input format:

```
{
    'time': current unit time
    'bid': price to SELL a unit of the product
    'ask': price to BUY a unit of the product
    'accu_order': accumulated order from the client
    'our_position': our banks current holding
    'balance': our trader's cash balance
    'client_balance'': our client's temporary cash balance, to be settled at EOD
    'order': the order the client put at this current time
    'run_id': the run_id of the evaluation assigned by the central server
    'tradedate_id': used to identify the same evaluation round
}
```

### Your respond format:

```
{
    'order': Int, the number of shares you want to buy, negative number indicate a sell.
}
```

## Case 1:

- The Start of the day initialization:

### Evaluator input

```
{
    "time": 0,
    "bid": 100,
    "ask": 101,
    "accu_order": 0,
    "our_position": 0,
    "balance": 0,
    "client_balance": 0,
    "order": 0,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### User respond

```
{
    'order': 0
}
```

- The first tick coming
  
### Evaluator input

```
{
    "time": 1,
    "bid": 100.0,
    "ask": 101.0,
    "accu_order": 33,
    "our_position": 0,
    "balance": 0,
    "client_balance": -3333.0,
    "order": 33,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### trader's potential respond

```
{
    'order': 33
}
```

Here the user hedge instanly, and we buy the stock at the same time our client has buy in. There's no risk left. Notice that you and client will buy at ask and sell at bid, so a frequent trading is prob not the optimal solution! Also you will pay 0.1% stamp duty for each orders.

- The second tick coming
  
### Evaluator input

```
{
    "time": 2,
    "bid": 100.0,
    "ask": 101.0,
    "accu_order": 21,
    "our_position": 33,
    "balance": -3336.333,
    "client_balance": -2133.0,
    "order": -12,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### trader's potential respond

```
{
    'order': -12
}
```

We are selling since our client are flattening the position. Also note that you will pay 0.1% stamp duty when selling as well.

- The Third tick coming

### Evaluator input

```
{
    "time": 3,
    "bid": 100.0,
    "ask": 101.0,
    "accu_order": -10,
    "our_position": 21,
    "balance": -2137.533,
    "client_balance": 967.0,
    "order": -31,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### trader's potential respond

```
{
    'order': -31
}
```

- The forth tick coming
  
### Evaluator input

```
{
    "time": 4,
    "bid": 101.0,
    "ask": 102.0,
    "accu_order": -6.0,
    "our_position": -10,
    "balance": 959.3670000000001,
    "client_balance": 559.0,
    "order": 4.0,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### trader's potential respond

```
{
    'order': 4
}
```

- The fifth tick coming

### Evaluator input

```
{
    "time": 5,
    "bid": 101.0,
    "ask": 102.0,
    "accu_order": -3.0,
    "our_position": -6,
    "balance": 550.9590000000001,
    "client_balance": 253.0,
    "order": 3.0,
    "run_id": "test",
    "tradedate_id": "ff153900fbb511ea96e834cff6dfab7d"
}
```

### trader's potential respond

```
{
    'order': 3
}
```

Assuming there's no other trades happen in the day, at EOD everything need to be flattened to zero, so both of the 3 short shares of your's and client's would be buy back at ask price at EOD. Then the result will be compared to benchmark algorithm's result.