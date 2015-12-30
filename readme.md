# Monadic streams for reactive programming

[![Circle CI](https://circleci.com/gh/wcandillon/jsoniq-runtime.svg?style=svg)](https://circleci.com/gh/wcandillon/jsoniq-runtime)

## Examples

```javascript
/* Get stock data somehow */
var source = getStockData();

source
  .filter(function (quote) {
      return quote.price > 30;
  })
  .map(function (quote) {
      return quote.price;
  })
  .forEach(function (price) {
    console.log('Prices higher than $30: $' + price);
  });
```

```javascript
/* Get stock data somehow */
let source = getAsyncStockData();

let subscription = source
  .filter(function (quote) {
    return quote.price > 30;
  })
  .map(function (quote) {
    return quote.price;
  })
  .subscribe({
    next: price => console.log('Prices higher than $30: $' + price),
    throw: err => console.log('Something went wrong: ' + err.message)
  });

/* When we're done */
subscription.unsubscribe();
```


