---
title: 'State'
---

## Props, State & Context

These are 3 kinds of inputs that you can read while rendering. **You should always treat these inputs as read-only.**

### Props

The object passed to the function component, **included children**. Props are like arguments you pass to a function. **They let a parent component pass data to a child component and customize its appearance**. For example, a `Form` can pass a `color` prop to a `Button`.

### State

State is like a component’s memory. **It lets a component keep track of some information and change it in response to interactions**. For example, a `Button` might keep track of `isHovered` state.

### Context

...

## Mutable State (Object & Array)

[You should treat all state (including these 2) as immutable!](#props-state--context)  
Instead of mutating an object, create a new version of it, and trigger a re-render by setting state to it.

### Object

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  },
})

person.artwork.city = 'New Delhi' // ❌: Don't mutate state

// ✅: Create a new object and set the state to it
// If you want to update a nested property, you’ll have to use it more than once (bc `...` spread is "shallow" - it only copies things one level deep)
const nextArtwork = { ...person.artwork, city: 'New Delhi' }
const nextPerson = { ...person, artwork: nextArtwork }
setPerson(nextPerson)
```

### Array

|           | avoid (mutates the array)           | prefer (returns a new array)       |
| --------- | ----------------------------------- | ---------------------------------- |
| adding    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax |
| removing  | `pop`, `shift`, `splice`            | `filter`, `slice`                  |
| replacing | `splice`, `arr[i] = ...` assignment | `map`                              |
| sorting   | `reverse`, `sort`                   | copy the array first (code below)  |

```jsx title="array-sort-example.js"
const [list, setList] = useState(initialList)

function handleClick() {
  const nextList = [...list]
  nextList.reverse()
  setList(nextList)
}
```

### Mutate Array

```jsx
const [todos, setTodos] = useState(initialTodos)

function handleChangeTodo(nextTodo) {
  setTodos(
    todos.map((t) => {
      if (nextTodo.id === t.id) {
        return {
          ...nextTodo,
        }
      } else {
        return t
      }
    }),
  )
}
```
