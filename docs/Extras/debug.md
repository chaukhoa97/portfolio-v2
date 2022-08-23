---
title: 'Debug'
---

## Browser Debug

### Pause Devtools

```js title='Devtools Console'
// Gõ in console tab; Hover rồi đợi 3s; Browser pause; Inspect & debug
setTimeout(function () {
  debugger
}, 3000)
```

### Overflow Detect

```css title='main.css'
/* Thấy dc thằng nào overflow */
* {
  outline: 1px solid #f00 !important;
}
```

## JS Debug

**Breakpoint**: Debugger temporarily pause execution there so you can decide what to do:

- **Continue**: Run normally until hitting a _Breakpoint_.
- **Step Over**: Run line by line, **ONLY** in the same file.
- **Step Into**: Run line by line, **STEP INTO** into any external function.
- **Step out**: When you've **STEP INTO** a function, **STEP OUT** will take you back to the line right after the function call (instead of the next _Breakpoint_ like **CONTINUE**)
