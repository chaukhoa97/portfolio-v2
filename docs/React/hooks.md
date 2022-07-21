---
title: 'Hooks'
---

## Optimize

### `useCallback`

Memoize **function**. Khi Component re-render, function trong `useCallback` sẽ ko re-create lại.

### `useMemo`

Memoize **value trả về từ function**. Dùng để chỉ re-render Component khi dependency thay đổi (giống `React.memo`) / Function tạo value quá phức tạp (ex: Sort, fetch,...).

> `useCallback(fn, deps)` = `useMemo(() => fn, deps)`

### `React.memo`

Chỉ re-render component dc wrap bởi `React.memo` khi props của component thay đổi &rarr; Khi wrap `React.memo` ở các high level component &rarr; các component ở dưới cũng sẽ ko bị re-render.

```jsx
const Parent = () => {
  //1. Parent re-render, cachedFn do có useCallback ko bị create lại.
  const cachedFn = useCallback(() => 'Some value', [])
  //2. prop của Children là cachedFn ko bị create lại...
  return <Children onClick={cachedFn} />
}
export default Parent
```

```jsx
const Children = ({ expensiveFn }) => {
  const uncachedValue = computeExpensiveValue(a, b) // Create lại mỗi lần Children re-render
  const cachedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

  return (
    <>
      {/* Khi `uncachedValue` thay đổi, hoặc bản thân `uncachedValue` là ref value, thì Kid1 sẽ re-render */}
      <Kid1 value={uncachedValue} />
      {/* Chỉ khi `cachedValue` thay đổi thì Kid2 mới re-render */}
      <Kid2 value={cachedValue} />
    </>
  )
}
//3. Children dc bọc bởi React.memo sẽ ko re-render khi Parent re-render (do prop là cachedFn ko đổi)
export default React.memo(Children)
```

## `useRef`

### Usage

Thường dùng cho ~ trường hợp phải giao tiếp với các external API - often a browser API that won’t impact the appearance of the component (`focus`, `scrollIntoView`). **You should only use them when you have to “step outside React".**

- Storing and manipulating DOM elements
- Storing other value that aren't necessary to calculate the JSX, thường là `timeoutId`. Example về **Debounce** button:

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

Vì vậy, value used for rendering thì dùng `useState`. Còn những thứ only needed by event handlers and changing it doesn’t require a re-render (Ex: input người dùng) thì dùng `useRef`. Những thứ constant ko show thì dùng `JS variable` như bình thường.

:::

### Controlled vs Uncontrolled Component with `useRef`

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

### Mimic `componentDidMount` & `componentDidUpdate` with `useRef`

```jsx
const mounted = useRef()
useEffect(() => {
  if (!mounted.current) {
    // do componentDidMount logic
    mounted.current = true
  } else {
    // do componentDidUpdate logic
  }
})
```

[Read more](https://codesandbox.io/s/componentdidmount-componentdidupdate-with-useref-8vw622?file=/StoryTray.js)

### One ref for a list of elements

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

## `useState` & `useReducer`

[So sánh `useState` & `useReducer`](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer).
Usage: Both are used to manage Narrow State. `useReducer` dùng cho ~ Narrow State mà có nhiều case.

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
    dispatch({ type: 'loading' }) // info = `state` line 6 = { loading: true, data: "", type: "loading" }
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

## `useEffect`

Usage: [Side effect](https://beta.reactjs.org/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events).  
You might not need an Effect to transform data for rendering or handle user events:

- [If you can calculate something during render, you don’t need an Effect.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)
- [To cache expensive calculations, add `useMemo` instead of `useEffect`.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#caching-expensive-calculations)
- [To reset the state of an entire component tree, pass a different `key` to it.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)
- [To reset a particular bit of state in response to a prop change, set it during rendering.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
- [Code that needs to run because a component was _displayed_ should be in Effects, the rest should be in events.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers)
- [If you need to update the state of several components, it’s better to do it during a single event.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#sending-a-post-request)
- [Whenever you try to synchronize state variables in different components, consider lifting state up.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#passing-data-to-the-parent)
- [You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.](https://beta.reactjs.org/learn/you-might-not-need-an-effect#subscribing-to-an-external-store)

### Snippet: Async & Cleanup in `useEffect`

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
  }, [])

  return <div>{loading ? 'Loading...' : count}</div>
}
```

### Snippet: Logic only run 1 time in `useEffect`

```jsx
let didInit = false
function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true
      // ✅ Only runs once per app load
      loadDataFromLocalStorage()
      checkAuthToken()
    }
  }, [])
  // ...
}
```

## [`useContext`](./state#context) / [Redux](./redux.md)

Usage: Manage Wide State.

## Custom Hook

Handle business logic ở CustomHook rồi truyền vào UI(dumb) Component

```jsx
// Custom hook must start with "use"
function useCounterUseCase(isForward = true) {
  const [state, setState] = useState({
    count: 0,
    isForward: true,
  })
  return state
}
```

```jsx
import useCounterUseCase from './useCounterUseCase.jsx'
function Container() {
  const { count, isForward } = useCounterUseCase(false)
  return isForward ? <div>{count + 1}</div> : <div>{count - 1}</div>
}
```
