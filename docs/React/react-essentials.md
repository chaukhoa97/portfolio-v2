---
title: 'Essentials'
sidebar_position: 1
---

## Key

Basically, keys in React are used to specify the position of the elements within their parent. It helps React infer what exactly happened, and make the correct updates to the DOM.  
Keys are NOT globally unique. They only need to be unique among their siblings. The most common use case of `key` is in a list of items. But it can also be useful in some case when you need to tell React not to preserve the state when the DOM tree structure match up with the previous one.

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. `index`: In fact, that’s what React will use if you don’t specify a `key` at all. If the list order changes when an item is inserted, delete or if the array is sorted, it will leads to confusing bugs.

## Virtual DOM

An in-memory copy of the Real DOM.

### How it works in React

When there are [re-renders](../React/react-lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component), while rendering ([1st phase](./react-lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component)), React will compute the diffs between what's _currently on the page_ vs what _should be on the page_, calculate the minimal necessary DOM operations to make the DOM match the latest rendering output, and then batch executes all updates.

### Cons

Using Virtual DOM is NOT faster because it's actually an **addition** to the final operations on the real DOM (_diffing_ is NOT free). It is only faster because it can reduce the number of DOM operations if we do the comparison in a more complex context when the real DOM doesn't have a way to optimize updates (e.g. batch updates, or list updates).

### Why React still uses Virtual DOM

Although more recent frameworks have their way to reduce DOM operations without using Virtual DOM, in real-world applications, the Virtual Dom is usually fast enough. After a certain point, performance is no longer the main selling point of a library or framework, especially when the difference is only in microseconds.

Using Virtual DOM also opens up possibilities to decouple rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. native mobile rendering in **React Native**, rendering to a string (**SSR**).

### Recent frameworks compiler

React, Vue, Angular ship JS code to the browser to make ur code work at the runtime. More recent frameworks have their own **compiler** that knows at _Build time_ how things could change in your app, rather than waiting to do the work at _Runtime_.  
It compiles your _declarative_ code into _efficient imperative_ code that works with **native browser APIs**, so the Virtual Dom can do less work &rarr; High performance and small package.

### Vue

Vue still uses Virtual Dom partially but Evan You want to take the _template_ and compile it to something that's **NOT** Virtual Dom at all, similar to **SolidJS** or **Svelte**: Directly create a piece of HTML DOM, and generate code that _binds individual nodes to reactive expressions_ instead of walking the whole DOM to figure out which node should each reactive expression bind to.

## Events

- [Events propagate upwards (children trước parent sau). Call `e.stopPropagation()` on the first argument to prevent that](https://beta.reactjs.org/learn/responding-to-events#event-propagation).
- [Events may have unwanted default browser behavior (Ex: The page reload when we submit a form). Call `e.preventDefault()` to prevent that](https://beta.reactjs.org/learn/responding-to-events#preventing-default-behavior).
