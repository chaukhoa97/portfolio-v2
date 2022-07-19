---
title: 'Hooks'
---

## Optimize

### `useCallback`

Memoize **function**. Khi Component re-render, function trong `useCallback` sẽ ko re-create lại.

### `useMemo`

Memoize **value trả về từ function**. Dùng để chỉ re-render Component khi dependency thay đổi (giống `React.memo`) / Function tạo value quá phức tạp (ex: Sort, fetch,...).

> `useCallback(fn, deps)` = `useMemo(() => fn, deps)`

### `React.memo(component)`

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

## `useRef(initValue)`

Usage: Truy cập, tương tác với DOM, thường là input để khi gõ không bị re-render lại.

`useState` vs `useRef`: `amountRef` value sẽ dc preserve khi Component re-render (giống `useState`). Nhưng khi `amountRef` thay đổi, nó ko khiến Component bị re-render (khác `useState`)

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

## `useState` / `useReducer`(Complex State)

Usage: Manage Narrow State

`useState` vs `let`: Cả 2 đều thay đổi variables in memory, nhưng show giá trị đó ra UI thì `let` không show đúng current value dc.

> Vì vậy, value show ra trên UI thì dùng `useState`. Còn những thứ khác như form người dùng nhập vào thì dùng `useRef` sẽ đỡ bị re-render hơn. Những thứ constant ko show thì dùng `JS variable` như bình thường.

### Example

- `useState` update dựa theo previous state
- Lazy init: `computeExpensiveValue` chỉ chạy ở lần render đầu tiên để tạo ra giá trị init của `count` state

```jsx
const [count, setCount] = useState(computeExpensiveValue(a,b)); // Hoặc useState(() => expensiveFn()); KHÔNG PHẢI useState(expenseiveFn())
<button onClick={() => setCount(0)}>Reset</button> // Normal
<button onClick={() => setCount((prev) => prev + 1)}>{count}</button>; // Theo prev state
```

## `useEffect`

Usage: Side effect.

### Example: Async in `useEffect`

```jsx
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      setCount(await result.json().userId)
    }
    fetchData()
  }, [])

  return <div>{loading ? 'Loading...' : count}</div>
}
```

## `useContext` / [Redux](./redux.md)

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
