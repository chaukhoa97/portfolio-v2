---
title: 'Essentials'
sidebar_position: 1
---

## Key

Keys are not globally unique. They only specify the position of elements within their parent. Keys helps React infer what exactly has happened, and make the correct updates to the DOM tree.

Key của 1 element trong 1 array là thứ có giá trị riêng biệt với các element khác (siblings) của nó:

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. **index**: Worst. If the list order changes when an item is inserted, delete or if the array is sorted, it will leads to subtle and confusing bugs. In fact, that’s what React will use if you don’t specify a `key` at all.

## Virtual DOM

An in-memory copy of the Real DOM. React, Vue, Angular ship JS code to the browser to make ur code work at the runtime.

### React

When there are [re-renders](../React/react-lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component), while rendering, React will compute the diffs between what's _currently on the page_ vs what _should be on the page_, calculate the minimal necessary DOM operations to make the DOM match the latest rendering output, and then batch executes all updates.

It also decouples rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. rendering to a string (**SSR**), native mobile rendering (**React Native**).

### Cons

Using Virtual DOM is NOT faster bc it's actually an **addition** of the final operations on the real DOM (_diffing_ is NOT free). It is only faster if we compare it in a more complex context when the DOM doesn't have a way to optimize updates (e.g. batch updates, or list updates) because it can reduce the number of DOM operations.  
Even though new frameworks nowadays have their way to achieve that without using Virtual DOM, in real-world applications, the Virtual Dom is usually fast enough. After a certain point, performance is no longer the main selling point of a library or framework, especially when the difference is only in microseconds.

### Compiler

New frameworks today have their own **compiler** that knows at build time how things could change in your app, rather than waiting to do the work at run time (it tries to do as much of the work in the build time).  
It compiles your _declarative_ code into _efficient imperative_ code that works with **native browser APIs**, so the Virtual Dom can do less work &rarr; High performance and small package.

### Vue

Vue still uses Virtual Dom partially but Evan You want to take the _template_ and compile it to something that's **NOT** Virtual Dom at all, similar to **SolidJS** or **Svelte**: Directly create a piece of HTML DOM, and generate code that _binds individual nodes to reactive expressions_ instead of walking the whole DOM to figure out which node should each reactive expression bind to.

## Events

- [Events propagate upwards (children trước parent sau). Call `e.stopPropagation()` on the first argument to prevent that](https://beta.reactjs.org/learn/responding-to-events#event-propagation).
- [Events may have unwanted default browser behavior (Ex: The page reload when we submit a form). Call `e.preventDefault()` to prevent that](https://beta.reactjs.org/learn/responding-to-events#preventing-default-behavior).
