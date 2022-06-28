---
title: 'Date & Time'
---

```js
Date.now() // Returns numbers. Faster than new Date().getTime()
const eventTime = new Date() // Tue Nov 16 2021 23:37:35 GMT+0700 (Indochina Time)
eventTime.toLocaleString() // 11/16/2021, 11:37:35 PM
eventTime.toLocaleDateString() // 11/16/2021
eventTime.toLocaleTimeString() // 11:37:35 PM
```
