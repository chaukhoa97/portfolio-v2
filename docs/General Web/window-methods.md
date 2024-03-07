---
title: 'Window Methods'
---

## Dialogs

```js
// Either alert('hello') or `window.alert('hello')` works, similar to all other methods below
alert('hello')

if (confirm('Are you sure you want to delete the task?')) {
  doSomething()
}

let userResponse = prompt('Please enter your name', 'Harry Potter')
console.log(userResponse) // Default is "Harry Potter"
```

## Scroll to top

```js
window.scrollTo({ top: 0, behavior: 'smooth' })
```

## Open and Close Window

```js
// All current versions of major browsers now automatically use the behavior of rel="noopener" for any target="_blank" link
let newWindow = window.open('https://www.example.com', '_blank')
setTimeout(() => newWindow.close(), 2000)
```

## History APIs

### Vanilla React client-side routing

```js
function handleClick(e) {
  e.preventDefault()
  window.history.pushState({}, '', e.currentTarget.href)
  // Calling history.pushState() or history.replaceState() won't trigger a popstate event. The popstate event is only triggered by clicking on the back or forward button, or calling window.history.back() or window.history.forward() in JavaScript
  events.emit('popstate')
}
```

### `window.history.pushState` vs `window.history.replaceState`

#### Key differences

- `pushState` adds a new entry to the history stack, allowing users to navigate forward and backward through the browser's history, while `replaceState` replaces the current entry in the history stack.

- When using `pushState`, if a user navigates to the new URL and then presses the back button, they will go back to the previous URL. With `replaceState`, if a user navigates to the new URL and presses the back button, they won't go back to the replaced URL; instead, they will go back to the URL before the replacement.

#### Common use cases

- `pushState` is typically used when you want to implement client-side routing in a single-page application (SPA). It allows you to create the illusion of navigation within the SPA without triggering full page reloads.

- `replaceState` is often used when you want to update the URL displayed in the address bar without adding a new entry to the history stack. This can be useful for scenarios like updating the URL in response to user input without creating new history entries.
