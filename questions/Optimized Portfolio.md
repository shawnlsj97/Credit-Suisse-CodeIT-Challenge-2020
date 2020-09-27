Optimized Portfolio
Portfolio Hedging Optimization
Problem Statement
You would be given Portfolio Data and a set of Index Futures Data to determine, which Index Future contract should be used to hedge the Portfolio and reduce the risk in an optimized manner. Index Future with the lowest optimal hedge ratio should be used as Optimized hedged position for the portfolio. If there are multiple future positions with the same Optimal Hedge Ratio, it should further be filtered on the lowest Futures Prc volatility. If still there are multiple records, filter based on lowest number of futures contract, to find the single fit.

Formulae to be used:
Optimal Hedge Ratio = ρ X (σs / σp)
Where:

ρ = The correlation coefficient of the changes in the spot and futures prices

σs = Standard deviation of changes in the spot price ‘s’

σp = Standard deviation of changes in the futures price ‘f’

An optimal hedge ratio is an investment risk management ratio that determines the percentage of a hedging instrument, i.e., a hedging asset or liability that an investor should hedge. As the hedge ratio approaches a value closer to 1, the established position is said to be “fully hedged.”
On the other hand, as the hedge ratio approaches a value closer to 0, it is said to be an “unhedged” position. So, a value of 0.4 indicates that only 40% of Portfolio Value needs hedging.

Number of Futures Contract = Optimal Hedge Ratio * (Portfolio value)/ (Futures contract size)
where, Futures contract size = Futures Price * Notional Value of Portfolio

Input Description:
For the Portfolio, following will be given:
Portfolio Name
Value
Underlying Spot Price volatility

For Index Future, following will be given:
Index Future name
Correlation Coefficients between Portfolio and the Index Future
Volatility of the Index Future Price
Price of the Index Future
Notional Value of the portfolio per Futures Contract

Output Description:
For the Given input Portfolio, find the Index Future, Optimal Hedge Ratio and Number of Futures Contract, which provides best hedging and lowest risk.
Number of futures contract should use ROUND to the nearest whole number.
Optimal Hedge ratio should use ROUND to 3 decimal places.
Requirements:
Expose a POST method with endpoint /optimizedportfolio
Return output result as json in the required format
Algorithm used should be optimized and sufficiently fast to enumerate results in split seconds
Constraints:
Write an optimized solution as total timeout for all the test cases in single evaluation is up to 30 secs.
Sample Input:
{
    "inputs": [
            {
                "Portfolio":{"Name":"Portfolio_Unhedged","Value":200000000,"SpotPrcVol":0.75},
                "IndexFutures": 
                [
                    {"Name":"Index_Fut_A","CoRelationCoefficient":0.75, "FuturePrcVol":0.95, "IndexFuturePrice":20.5, "Notional": 100000},
                    {"Name":"Index_Fut_B","CoRelationCoefficient":0.25, "FuturePrcVol":0.85, "IndexFuturePrice":15.5, "Notional": 100000}
                ]
            }
    ]
}
Sample Output:
{
    "outputs": [
            {"HedgePositionName":"Index_Fut_B","OptimalHedgeRatio":0.221, "NumFuturesContract":29}
    ]
}
NOTE:
This is a sample, input could be large data having multiple records.
Accordingly, output too will have multiple values.