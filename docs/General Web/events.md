---
title: 'Events'
---

## Overall (in React)

Each event propagates in three phases:

1. It travels down, calling all `onClickCapture` handlers.
2. It runs the clicked element’s `onClick` handler.
3. It travels upwards, calling all `onClick` handlers.

```jsx
// In rare cases, you might need to catch all events on child elements, even if they stopped propagation.
<div
  onClickCapture={() => {
    // this runs first
  }}
>
  <button onClick={(e) => e.stopPropagation()} />
  <button onClick={(e) => e.stopPropagation()} />
</div>
```

## Event Bubbling

In the _bubbling phase_, events _bubble/ propagate_ up the tree (from children to parent) -> [Call `e.stopPropagation()` if you want to prevent an event bubbling up to parent](https://react.dev/learn/responding-to-events#event-propagation). It is the mechanism behind [Event Delegation](#event-delegation)

## Event Capturing

In the _capturing phase_, the event starts from the root of the DOM tree and travels down to the target element. Events using `onClickCapture` in React or the third argument `true` in `element.addEventListener(eventType, eventHandler, useCapture)` method are called during this phase.

The first of the three phases of event propagation (the other two are Target Phase and [Bubbling Phase](#event-bubbling)). This phase is rarely used in web development and is usually bypassed.

## Event Delegation

Attaching a single event listener to a parent element rather than attaching mutiple ones for every descendant element.

```html
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```js
const myList = document.getElementById('myList')

myList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent)
  }
})
```

## Prevent Default Event Behavior

Events may have unwanted default browser behavior (Ex: The page reload when we submit a form) -> [Call `e.preventDefault()` to prevent that](https://react.dev/learn/responding-to-events#preventing-default-behavior).
