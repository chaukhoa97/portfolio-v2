---
title: 'React with TypeScript'
---

## Get type of an element's props

```ts
type Props = React.ComponentProps<typeof MyComponent> // e.g. <"button">
```

## Default `props`, `children`, `style`, and `rest`

```tsx
type ButtonProps = {
  disabled?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

const Button = ({ disabled = false, children, ...rest }: ButtonProps) => (
  <button disabled={disabled} style={{ color: 'red' }} {...rest}>
    {children}
  </button>
)
```

## DOM Events

```tsx
const MyComponent = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => null
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => null

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <input onChange={handleInputChange} />
    </>
  )
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
