---
title: 'Data Convert'
---

## Number to String

```js
// Either has there 2 have better performance than String(number) & number.toString()
let a = 100 + 23 + ''
let b = `${100 + 23}`
```

## String to Number

```js
Number('99 88') // returns NaN
parseFloat('12.34') // String -> Float
parseInt('12.34') // String -> Int
```
