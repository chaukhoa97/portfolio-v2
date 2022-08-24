---
title: 'Hooks'
---

## `useRef`

### Usage

You should only use them when you have to “step outside React"

- Communicate with external APIs - often a browser API that won’t impact the appearance of the component (`focus`, `scrollIntoView`) &rarr; Storing and manipulating DOM elements.

- Storing and persisting other values that only needed by event handlers and changing it doesn’t require a re-render (it's NOT necessary for calculating the JSX), e.g. `timeoutId`, user input.  
  _Example về Debounce button sử dụng `ref`:_

  ```jsx
  const timeoutRef = useRef(null);

  <button onClick={() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {}, 1000);
  }}>
  ```

### Do not write or read `ref.current` during rendering

```jsx
function MyComponent() {
  // ...
  // ❌ Don't write a ref during rendering
  myRef.current = 123
  // ...
  // ❌ Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>
}
```

You can read or write refs from event handlers or effects instead.

```jsx
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123
  })
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current)
  }
  // ...
}
```

### `useRef` vs `useState` vs `let`

|                                           | `useRef` | `useState` | `let` |
| :---------------------------------------: | :------: | :--------: | :---: |
| Value dc preserve khi Component re-render |    ✅    |     ✅     |  ❌   |
|  Update value khiến Component re-render   |    ❌    |     ✅     |  ❌   |
|                  Mutable                  |    ✅    |     ❌     |  ✅   |

:::note

Vì vậy, value used for rendering thì dùng `useState`. Còn những thứ only needed by event handlers and changing it doesn’t require a re-render (Ex: user input, timeoutId) thì dùng `useRef`. Những thứ constant ko show thì dùng `JS variable` như bình thường.

:::

### Snippet: Controlled vs Uncontrolled Component with `useRef`

```jsx title='Controlled.jsx'
// State của <input> do React quản lý
const [term, setTerm] = useState('')
// Gõ phím -> `term` dc update -> Value của <input> update theo
<input value={term} onChange={(e) => setTerm(e.target.value)} />
```

```jsx title='Uncontrolled.jsx'
// State của input là internal state, mình chỉ lấy value về bằng ref...
const termRef = useRef()
// ...termRef.current bây h chính là <input> trên DOM -> Có thể gọi hàm ví dụ như termRef.current.focus()
<input ref={termRef} type="text" />
```

### Snippet: One `ref` for a list of elements

```jsx
const [index, setIndex] = useState(0)
const selectedRef = useRef(null)
{
  cats.map((cat, i) => (
    <Cat
      key={cat.id}
      cat={cat}
      onClick={() => {
        setIndex(i)
      }}
      ref={index === i ? selectedRef : null}
    />
  ))
}
```

## `useEffect`

### "Effect" vs "Side effect"

:::info

“Effect” refers to the React-specific definition above, i.e. a side effect caused by rendering. To refer to the broader programming concept, we’ll say “side effect”.

:::
There are 2 types of logic inside React components:

- Rendering code MUST be pure. This is where you take the props and state, transform them, and return the JSX.
- Event handlers can contain "side effects" (they change the program's state) that are caused by a specific user action (Ex: button click).

### "Effect" vs "Event"

"Effects" refers to side effects caused by _rendering itself_, rather than by a _particular event_, thus **can't** be handled by event handlers.  
For example, sending a message in the chat is an _Event_ because it is directly caused by the user clicking a specific button. However, setting up a server connection is an _Effect_ because it needs to happen regardless of which interaction caused the component to appear.

### Usage & Syntax

Some components need to synchronize with external systems (like network or a third-party library). For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen.  
 _Effects_ let you run some code after rendering so that you can synchronize your component with some system outside of React.

```jsx
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const connect = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      setCount(await result.json().userId)
    }
    connect()
    return () => {
      disconnect()
    }
    // If dependency is an empty array, code in useEffect will run only on mount
    // and the cleanup fn will be called before unmount.
  }, [])

  return <div>{loading ? 'Loading...' : count}</div>
}
```

:::tip

- Ko cần cleanup (Chạy rồi thì k cần quan tâm nữa): Gọi API, Tương tác DOM
- Cần cleanup: setTimeout/Interval, connection to a server/database

:::

### How it runs from the component’s perspective

- **Mounting**: Render &rarr; Commit &rarr; `useEffectCode`
- **Updating**: Render &rarr; Commit &rarr; `cleanUp` &rarr; `useEffectCode`
- **Unmounting**: `cleanUp`

:::note

_Mount/Unmount_ means Adding/Removing nodes to the DOM

:::

### How it runs from the Effect’s perspective

Effect start connecting (until it disconnected by looking at deps)

### You might not need an Effect to transform data for rendering or handle user events

- [If you can calculate something during render, you don’t need an Effect.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)
- [To cache expensive calculations, add `useMemo` instead of `useEffect`.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#caching-expensive-calculations)
- [To reset the state of an entire component tree, pass a different `key` to it.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)
- [To reset a particular bit of state in response to a prop change, set it during rendering.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
- [Code that needs to run because a component was _displayed_ should be in Effects, the rest should be in events.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers)
- [If you need to update the state of several components, it’s better to do it during a single event.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#sending-a-post-request)
- [Whenever you try to synchronize state variables in different components, consider lifting state up.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#passing-data-to-the-parent)
- [You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#subscribing-to-an-external-store)

## Optimize

### `useCallback`

Memoize **function**. Khi Component re-render, function trong `useCallback` sẽ ko re-create lại.

### `useMemo`

Memoize **return value of the function**. Dùng để chỉ re-render Component khi dependency thay đổi (giống `React.memo`), hoặc khi Function tạo value quá phức tạp (ex: Sort, fetch,...).

:::note
`useCallback(someFunction, deps)` are the same with `useMemo(() => someFunction, deps)`
:::

### `React.memo`

Chỉ re-render component dc wrap bởi `React.memo` khi props của component thay đổi &rarr; Khi wrap `React.memo` ở các high level component &rarr; các component ở dưới cũng sẽ ko bị re-render.

```jsx
const Parent = () => {
  const someFunction = () => 'Some value'
  //1. Parent re-render, cachedFn do có useCallback ko bị create lại.
  const cachedFn = useCallback(someFunction, [])
  //2. prop của Children là cachedFn ko bị create lại...
  return <Children expensiveFn={cachedFn} />
}
export default Parent
```

```jsx
const Children = ({ expensiveFn }) => {
  const uncachedValue = [computeExpensiveValue(a, b)] // Create lại mỗi lần Children re-render
  const cachedValue = useMemo(() => [computeExpensiveValue(a, b)], [a, b])

  return (
    <>
      {/* `uncachedValue` là ref value -> `value` prop của Kid1 thay đổi mỗi khi Children re-render */}
      <Kid1 value={uncachedValue} />
      {/* Chỉ khi `cachedValue` thay đổi thì `value` prop của Kid2 mới đổi */}
      <Kid2 value={cachedValue} />
    </>
  )
}
//3. Children sẽ KO re-render khi Parent re-render do prop (ở đây là cachedFn) ko đổi
export default React.memo(Children)
```

## `useState` & `useReducer`

### Usage & Comparison

Usage: Both are used to manage _Narrow State_. `useReducer` dùng cho ~ Narrow State mà có nhiều case.  
Use [`useContext`](./state#context) or [Redux](./redux.md) for _Wide State_.

_Read more_: [So sánh `useState` & `useReducer`](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer).

### `useState`

A state variable’s value never changes within a render, even if its event handler’s code is asynchronous

```jsx
// Lazy init: `computeExpensiveValue` chỉ chạy ở lần render đầu tiên để tạo ra giá trị init cho `count` state
const [count, setCount] = useState(() => computeExpensiveValue(a,b));
<button onClick={() => setCount(0)}>Reset</button> // Normal
<button
  onClick={() => {
    // Update dựa theo prev state, convention là letter đầu tiên của state (count -> c)
    setCount((c) => c + 5);
    // Alert 0 thay vì 5, `alert` ở đây đã nhận snapshot của `count` state ngay lúc click btn (0)
    // Sau đó dẫu `count` có thay đổi (0 -> 5) cũng k ảnh hưởng tới giá trị dc `alert`
    setTimeout(() => {
      alert(count);
    }, 1000);
  }}
>
  +5
</button>
```

_[Demo CodeSanbox](https://codesandbox.io/s/state-as-snapshot-dtklvu?file=/App.js)_

### `useReducer`

```jsx
import { useReducer } from 'react'

const infoReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { loading: true }
    case 'success':
      return { ...action, loading: false }
    default:
      throw Error('Unknown action: ' + action.type)
  }
}

function ReducerExample() {
  const [info, dispatch] = useReducer(infoReducer, {
    loading: false,
    data: '',
  })
  const getInfo = () => {
    dispatch({ type: 'loading' }) // info = `state` line 3 = { loading: true, data: "", type: "loading" }
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then((json) => dispatch({ type: 'success', data: json })) // info = { loading: false, data: {...}, type: "success" }
    }, 1000)
  }

  return (
    <>
      {info.loading ? <h5>Loading...</h5> : <h5>{info.data.title}</h5>}
      <button onClick={getInfo}>Get data</button>
    </>
  )
}

export default ReducerExample
```

## Custom Hook

Handle business logic ở CustomHook rồi truyền vào UI(dumb) Component

```jsx
// Custom hook MUST start with "use"
function useCounterUseCase(requiredArgs, { optionalArgs = 'default' }) {
  const [value, setValue] = useState(optionalArgs ? optionalArgs : requiredArgs)
  return { value, setValue }
}
```

```jsx
import useCounterUseCase from './useCounterUseCase.jsx'
function Container() {
  const { value, setValue } = useCounterUseCase('required args come first...', {
    optionalArgs: 'remaining optional args are inside the options object',
  })
}
```
