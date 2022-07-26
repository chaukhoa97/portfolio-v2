---
title: 'Basis'
---

## Terms

- **Mount/Unmount**: Adding/Removing nodes to the DOM

### Other Terms

- **Client-side navigation**: Page transition are handled by JavaScript.
- **Lazy load**: Images are only loaded when they enter the viewport.

## Events

- [Events propagate upwards (children trước parent sau). Call `e.stopPropagation()` on the first argument to prevent that](https://beta.reactjs.org/learn/responding-to-events#event-propagation).
- [Events may have unwanted default browser behavior (Ex: The page reload when we submit a form). Call `e.preventDefault()` to prevent that](https://beta.reactjs.org/learn/responding-to-events#preventing-default-behavior).

## Key

Keys are not globally unique. They only specify the position of elements within their parent. Keys helps React infer what exactly has happened, and make the correct updates to the DOM tree.

Key của 1 element trong 1 array là thứ có giá trị riêng biệt với các element khác (siblings) của nó:

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. **index**: Worst. If the list order changes when an item is inserted, delete or if the array is sorted, it will leads to subtle and confusing bugs. In fact, that’s what React will use if you don’t specify a `key` at all.
