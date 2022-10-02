---
title: 'React with TypeScript'
---

## Defaut `props`

```tsx
type GreetProps = { age?: number };
const Greet = ({ age = 21 }: GreetProps) => ...
```

## `PropsWithChildren`

```tsx
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<any> {}

// Không có children trong Props nhưng vẫn add dc
const MyComponent = ({ children }: Props) => {
  return <h1>{children}</h1>
}
```

## Hooks

### `useState`

Spec the type **specifically** to help TS infer the type of the state.

```tsx
const [user, setUser] = useState<number[]>([1, 2, 3])
```

### `useEffect`

Ko dc return gì về ngoại trừ `void` / `Destructor`

### `useRef`

```tsx
// If possible, prefer as specific as possible.
// For example, `HTMLDivElement` is better than `HTMLElement` and way better than `Element`.
const divRef = useRef<HTMLDivElement>(null)
return <div ref={divRef}>etc</div>
```

## Enums with state

```tsx
enum Status {
  Pending = 'Đang chờ',
  Success = 'Thành công',
}

const [status, setStatus] = useState<Status>(Status.Pending)
<button onClick={() => setStatus(Status.Success)}> Meo </button>
<p>{status}</p> // Thành công
```
