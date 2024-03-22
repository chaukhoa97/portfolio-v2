---
title: 'TypeScript in React'
---

## Get the type of the `props` of a component

```tsx
const MyComponent = ({ name, age }: { name: string; age: number }) => {
  return <div>{`My name is ${name} and I am ${age} years old.`}</div>
}

type NewProps = React.ComponentProps<typeof MyComponent> // NewProps is equivalent to MyComponentProps
type ButtonProps = React.ComponentProps<'button'> // == React.ButtonHTMLAttributes<HTMLButtonElement>
```

Avoid getting the type directly from a component via `type NewProps = React.ComponentProps<typeof MyComponent>`, because it will directly depends on the `MyComponent` implementation. This violates _Dependency Inversion Principle_. Instead, we should extract the `props` type to a separate type and reuse it

```tsx
export type MyComponentProps = { name: string; age: number } // reuse this, no need to have `NewProps` type
```

## Event and Event Handler types

```tsx
const MyComponent = () => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => null
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => null
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => null
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => null
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => null
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => null

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <input onChange={handleInputChange} />
    </>
  )
}
```

## [Type of a React component passed as `props`](https://codesandbox.io/p/sandbox/react-component-as-prop-icon-l6y3p8?file=/src/App.tsx:16,18)

In React and TypeScript, ReactElement, ReactNode, and JSX.Element are types used to describe what a component can return or what can be passed as props. Here are the differences:

ReactElement: This is an object with a type and props, which is the typical output of JSX expressions. It's the most specific type among the three. A ReactElement is essentially an object representation of a React component or a DOM element.

ReactNode: This is a more general type that includes ReactElement but also other things a component can return: strings, numbers, fragments, portals, null, and booleans. This is typically used in the context of children, where children can be a wide variety of things.

JSX.Element: This is similar to ReactElement, but it's provided by TypeScript's JSX typings. It's what you get when you create a JSX element (<div />, <MyComponent />, etc.). In most React applications, JSX.Element and ReactElement can be used interchangeably.

In summary, if you're typing a prop that's going to be a JSX element or a component, you can use ReactElement or JSX.Element. If you're typing children or something that could be a wider variety of outputs, use ReactNode.

```tsx
type ButtonProps = { icon: ReactElement<IconProps> }

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

## Hooks

### `useState`

Spec the type **specifically** to help TS infer the type of the state.

```tsx
// Enums with `useState`
enum Status {
  Pending = 'Đang chờ',
  Success = 'Thành công',
}

const [status, setStatus] = useState<Status>(Status.Pending)

<button onClick={() => setStatus(Status.Success)}> Meo </button>
<p>{status}</p> // Thành công
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
