---
title: 'Lifecycle'
---

### React re-render component khi

- Any **State** of the component change(including state updates from the **Custom hooks** your component consumes).
- Any [**Prop** / **ContextValue** consumed by your component] changes.
- Parent của component re-render (trừ `React.memo`).

### Lifecycle

![Lifecycle](https://i.imgur.com/tSYbUyv.png)
