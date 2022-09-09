---
title: 'React Lifecycle'
---

![Lifecycle](https://i.imgur.com/tSYbUyv.png)

## Steps

### Step 1: React trigger render (`initial` hoặc `re-render`) Component

During render, React _calls your **Component function**_ to figure out what should be on the screen. React triggers a Component rendering when:

- Any of these change: **State**(including state updates from the _Custom hooks_ your component consumes), **Props**, **Context Value**, **Custom Hook Value** consumed by your Component.
- Parent của Component re-render (trừ khi Component dc wrap bởi `React.memo`). [If passed as `prop` instead of directly passed to Component, React will NOT re-render Component when Parent re-render](#lift-ur-component-up-and-pass-it-down-as-a-prop).

:::caution

You must not declare nested components in your Component function because they can be redefined when Parent re-render

:::

```jsx
// ✅ Tách Child ra ngoài
const Child = ({ onClick }) => {
  return <button onClick={onClick}>+</button>
}

const Parent = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  // ❌ Nested Component
  const NestChild = ({ onClick }) => {
    return <button onClick={onClick}>+</button>
  }

  return (
    <>
      <Child onClick={handleClick} />
      <NestChild onClick={handleClick} />
    </>
  )
}
```

### Step 2: React commits changes to the DOM

After rendering (calling) your components, React will applies changes the DOM.

- For the initial render, React will use the [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) DOM API to put all the DOM nodes it has created on screen.
- For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output, which means React only changes the DOM nodes if there’s a difference between renders.

:::caution
After React commits changes to the DOM, it will run your [Effects](./hooks#how-it-runs) because this is a good time to synchronize the React components with external systems.  
If your Effect _also_ immediately updates the state, this restarts the whole process from scratch!
:::

### Epilogue: Browser paint

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion.

## Mimic lifecycle methods

### `componentDidMount`

```jsx
useEffect(() => {
  // Do stuff
}, [])
```

<details>
  <summary><b>CAUTION</b>: This is different with logics that&nbsp;
  <a href="https://beta.reactjs.org/learn/you-might-not-need-an-effect#initializing-the-application"><i>only</i> run one time when the application starts</a></summary>

```jsx
let didInit = false
function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true
      // ✅ Only runs once per app load
      checkAuthToken()
    }
  }, [])
}
// HOẶC
if (typeof window !== 'undefined') {
  // Check if we're running in the browser.
  // ✅ Only runs once per app load
  checkAuthToken()
}
```

</details>

### `componentDidUpdate`

```jsx
const mounted = useRef()
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true
    // Do `componentDidMount` logic
  } else {
    // Do `componentDidUpdate` logic
  }
}, [yourDepedencies])
```

See example in [CodeSanbox](https://codesandbox.io/s/componentdidmount-componentdidupdate-with-useref-8vw622?file=/App.js)

### `componentWillUnmount`

```jsx
useEffect(() => {
  return () => {
    // Do `componentWillUnmount` logic
  }
}, [])
```

## [Reduce re-rendering](https://www.zhenghao.io/art/blog/react-rerender/flowchart.jpeg)

### Lift ur component up and pass it down as a prop

1. `ChildA` gets compiled to `React.createElement(ChildA, null)` by Babel that creates a `ReactElement` of this shape `{ type: Child, props: {} }`. `props` là ref value &rarr; `ChildA` luôn bị re-render khi `Parent` re-render.
2. `ChildB` & `ChildC` all passed as prop of `Parent` &rarr; no `React.createElement` is called for `ChildB` & `ChildC` (Có thể hiểu `prop` chỉ reference tới `ChildB` & `ChildC` chứ ko [call Component function](#step-1-react-trigger-render-initial-hoặc-re-render-component) của 2 thằng này).

```jsx
default function App() {
  return (
    <Parent lastChild={<ChildC />}>
      <ChildB />
    </Parent>
  );
}

function Parent({ children, lastChild }) {
  return (
    <div className="parent">
      <ChildA />
      {children}
      {lastChild}
    </div>
  );
}

function ChildA() {
  return <div className="childA"></div>;
}

function ChildB() {
  return <div className="childB"></div>;
}

function ChildC() {
  return <div className="childC"></div>;
}
```
