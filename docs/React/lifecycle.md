---
title: 'Lifecycle'
---

![Lifecycle](https://i.imgur.com/tSYbUyv.png)

## Step 1: React trigger render (`initial` hoặc `re-render`) Component

During render, React _calls your **Component function**_ to figure out what should be on the screen. React trigger render when:

- Any of these change: **State**(including state updates from the _Custom hooks_ your component consumes), **Prop**, **ContextValue** consumed by your Component.
- Parent của Component re-render (trừ `React.memo`).

## Step 2: React commits changes to the DOM

After rendering (calling) your components, React will applies changes the DOM.

- For the initial render, React will use the [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) DOM API to put all the DOM nodes it has created on screen.
- For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output, which means React only changes the DOM nodes if there’s a difference between renders.

After React commits changes to the DOM, it will run your [Effects](./hooks#effect-vs-side-effect) because this is a good time to synchronize the React components with some external system. If your Effect _also_ immediately updates the state, this restarts the whole process from scratch!

## Epilogue: Browser paint

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion.
