---
title: 'History'
---

## Vanilla React client-side routing

```js
function handleClick(e) {
  e.preventDefault()
  window.history.pushState({}, '', e.currentTarget.href)
  // Calling history.pushState() or history.replaceState() won't trigger a popstate event. The popstate event is only triggered by clicking on the back or forward button, or calling window.history.back() or window.history.forward() in JavaScript
  events.emit('popstate')
}
```

## `window.history.pushState` vs `window.history.replaceState`

### Key differences

- `pushState` adds a new entry to the history stack, allowing users to navigate forward and backward through the browser's history, while `replaceState` replaces the current entry in the history stack.

- When using `pushState`, if a user navigates to the new URL and then presses the back button, they will go back to the previous URL. With `replaceState`, if a user navigates to the new URL and presses the back button, they won't go back to the replaced URL; instead, they will go back to the URL before the replacement.

### Common use cases

- `pushState` is typically used when you want to implement client-side routing in a single-page application (SPA). It allows you to create the illusion of navigation within the SPA without triggering full page reloads.

- `replaceState` is often used when you want to update the URL displayed in the address bar without adding a new entry to the history stack. This can be useful for scenarios like updating the URL in response to user input without creating new history entries.
