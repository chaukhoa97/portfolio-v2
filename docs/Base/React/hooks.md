---
title: 'Hooks'
---

### Optimize

- `useCallback(fn, deps)` = `useMemo(() => fn, deps)`
- `React.memo(component)`: Chỉ re-render component dc wrap bởi `React.memo` khi props của component thay đổi -> Khi wrap `React.memo` ở các high level component -> các component ở dưới cũng sẽ ko bị re-render.
- `useCallback`: Khi Component re-evaluate, function trong useCallback sẽ ko re-create lại.
- `useMemo`: Dùng để chỉ re-render Component khi dependency thay đổi (giống `React.memo`) / Function tạo value quá phức tạp (ex: Sort, fetch,...).

```jsx
const Parent = () => {
  //1. Parent re-render, cachedFn do có useCallback ko bị create lại.
  const cachedFn = useCallback(() => 'Some value', []);
  //2. prop của Children là cachedFn ko bị create lại...
  return <Children expensiveFn={cachedFn} />;
};
export default Parent;
```

```jsx
const Children = ({ expensiveFn }) => {
  // Create lại mỗi lần Children re-render
  const uncachedValue = expensiveFn();
  // Create lại theo Dependency
  const cachedValue = useMemo(() => expensiveFn, []);
  const createMemoizedComponent = useMemo(
    () => <Child memoizedValue={cachedValue} />,
    [cachedValue]
  );

  return (
    <>
      <Kid a={uncachedValue} />; // Khi uncachedValue thay đổi/là ref value, thì
      Kid sẽ re-render
      {createMemoizedComponent}
    </>
  );
};
//3. prop ko đổi + React.memo -> Children sẽ ko re-render khi Parent re-render
export default React.memo(Children);
```

### useRef vs useState vs let-const

- `useState` vs `let`: Cả 2 đều thay đổi variables in memory, nhưng show giá trị đó ra UI thì `let` không show đúng current value dc.
- `useRef(initValue)`: `amountRef` value sẽ dc preserve khi Component re-render (giống useState). Nhưng khi amountRef thay đổi, nó ko khiến Component bị re-render (khác useState).

Vì vậy, value show ra trên UI thì dùng `useState`. Còn những thứ khác như form người dùng nhập vào thì dùng `useRef` sẽ đỡ bị re-render hơn. Những thứ constant ko show thì dùng `JS variable` như bình thường.

#### `useState` update dựa theo previous state; Lazy init - `expenseviveFn` chỉ chạy ở lần render đầu tiên để tạo ra giá trị init của state; Pass callback vào `onClick`

```jsx
const expensiveFn = () => 100;
// Hoặc useState(() => expensiveFn()); KHÔNG PHẢI useState(expenseiveFn())
const [count, setCount] = useState(expensiveFn);
<button onClick={() => setCount(0)}>Reset</button> // Normal
<button onClick={() => setCount((prev) => prev + 1)}>{count}</button>; // Theo prev state
```

### Controlled vs Uncontrolled Component with `useRef`

```jsx
// State của <input> do React quản lý
// Gõ phím -> titleState update -> Value của <input> update theo
<input value={titleState} onChange={(e) => setTitleState(e.target.value)} />
```

```jsx
// State của input là internal state, mình chỉ lấy value về bằng ref...
const titleRef = useRef();
// ...titleRef.current bây h chính là <input> -> Có thể gọi hàm ví dụ như titleRef.current.focus()
<input ref={titleRef} type="text" />;
```

### Custom Hook

Handle business logic ở CustomHook rồi truyền vào UI(dumb) Component

```jsx
// Custom hook must start with "use"
function useCounterUseCase(isForward = true) {
  const [state, setState] = useState({
    count: 0,
    isForward: true,
  });
  return state;
}
```

```jsx
import useCounterUseCase from './useCounterUseCase.jsx';
function Container() {
  const { count, isForward } = useCounterUseCase(false);
  return isForward ? <div>{count + 1}</div> : <div>{count - 1}</div>;
}
```

### Usage

- `useRef`: Truy cập, tương tác với DOM, thường là input để khi gõ không bị re-render lại.
- `useState` / `useReducer`(Complex State): Manage Narrow State.
- `useContext` / Redux: Manage Wide State.
- `useMemo` / `useCallback` / `React.memo`: Optimize.
- `useEffect`: Side effect.
