---
title: 'TypeScript in React'
---

## Get type of an element's props

```ts
type Props = React.ComponentProps<typeof MyComponent> // e.g. <"button">
```

## Default `props`, `children`, `style`, and `rest`

```tsx
type ButtonProps = {
  children: React.ReactNode // Widest, can be ReactElement, ReactFragment, string...
  disabled?: boolean
  style?: React.CSSProperties
}

const Button = ({ disabled = false, children, ...rest }: ButtonProps) => (
  <button disabled={disabled} style={{ color: 'red' }} {...rest}>
    {children}
  </button>
)
```

## [React component as `props`](https://codesandbox.io/p/sandbox/react-component-as-prop-icon-l6y3p8?file=/src/App.tsx:16,18)

```tsx
type ButtonProps = {
  icon: ReactElement<IconProps> // JSX element
}

export const ButtonWithIconElement = ({
  icon = <DefaultIcon />,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const clonedIcon = React.cloneElement(icon, {
    // Default props for the passed icon
    isHovered: isHovered,
    width: 32,
    height: 32,
  })

  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {clonedIcon}
    </button>
  )
}

function SvgComponent(props: any) {
  return (
    <svg
      {/* set the color inside the object */}
      fill={props.isHovered ? 'currentColor' : 'red'}
      {/* set the color of the line drawn around the object */}
      stroke={props.isHovered ? 'currentColor' : 'red'}
      width={24}
      height={24}
      {...props}
    />
  )
}

function App() {
  return <ButtonWithIconElement icon={<SvgComponent anyProps />} />
}
```

## DOM Events' types

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

## Try catch

```tsx
function getErrorMessage(error: unknown) {
  // `Error` is a built-in type: interface Error { name: string; message: string; stack?: string }
  if (error instanceof Error) return error.message
  return `${error}`
}

const reportError = ({ message }: { message: string }) => {
  // send the error to our logging service...
}

try {
  throw new Error('Oh no!')
} catch (error) {
  reportError({ message: getErrorMessage(error) })
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

## Enums with `useState`

```tsx
enum Status {
  Pending = 'Đang chờ',
  Success = 'Thành công',
}

const [status, setStatus] = useState<Status>(Status.Pending)
<button onClick={() => setStatus(Status.Success)}> Meo </button>
<p>{status}</p> // Thành công
```
