const a= {
    'Volume Screener -  Xypher.IO': 'Binance Futures',
    __EMPTY: 'DYDXUSDT',
    __EMPTY_1: 'USDT',
    __EMPTY_2: 'DYDX',
    __EMPTY_3: 51919,
    __EMPTY_4: 61803,
    __EMPTY_5: 113722,
    __EMPTY_6: -9883.39,
    __EMPTY_7: 0.0012,
    __EMPTY_8: 95360317
  }

const { 
    'Volume Screener -  Xypher.IO': exchange,
    __EMPTY: symbol,
    __EMPTY_1: quote,
    __EMPTY_2: base,
    __EMPTY_3: bought,
    __EMPTY_4: sold,
    __EMPTY_5: total_trade,
    __EMPTY_6: diff,
    __EMPTY_7: percent,
    __EMPTY_8: vol
 }= a

const newA= {exchange, symbol, quote, base, bought, sold, total_trade, diff, percent, vol}

console.log(newA)