---
title: 'Devtools'
---

### Browser debug

```js
// Gõ in console tab -> Hover rồi đợi 3s -> Browser pause -> debug
setTimeout(function () {
  debugger
}, 3000)
```

```css
<!-- Thấy dc thằng nào overflow -- > * {
  outline: 1px solid #f00 !important;
}
```

### JavaScript Debug

```js
//! Always have a code debugging in Chrome wrapped by a {}
{
  function main() {
    const s = foo()
    bar(s)
  }

  function foo() {
    return 'hi'
  }

  function bar(s) {
    const t = s + foo() //* Debugger is currently here
    return t
  }
}
```

- Step into will proceed into the foo call, and the current line will then become `return hi`
- Step over will ignore the foo() method is being invoked, and will proceed to the `return t`
- Step out will finish the execution of the rest of `bar(s)`, and control will return to the last line of the main method.
