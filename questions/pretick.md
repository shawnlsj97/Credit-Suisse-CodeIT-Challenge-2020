# Pre-Tick

A trader is trying to predict accurately the future price of an instrument such as a share or forex in this period of volatility. To start off, the trader does not need to predict the far future but just if the instrument will increase or decrease in price for the next tick. For that to happen, the trader will need your help to build the model.

## Objective
Build an endpoint /pre-tick that will receive 2000 records of an instrument in chronological order.

The data provided will be in csv format with ',' as separator and '\n' as line delimiter.

There is no limit on the type of algorithm allowed for the model. Feel free to use machine learning if desired.

Predict the close price of the instrument in the next tick.

### Sample Input
"Open,High,Low,Close,Volume

867.4,873.1,862.9,873.1,761.0

914.9,924.6,911.1,917.9,741.0"

### Expected Output
"920.5"