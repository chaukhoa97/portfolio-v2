---
title: 'React Snippets'
---

### Async function in `useEffect`

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

### Show obj ra page

```jsx
Object.entries(product).map(([key, val]) => (
  <Fragment key={key}>
    <p style={{ color: 'red' }}>{key}</p>
    <pre>{JSON.stringify(val, null, 2)}</pre>
  </Fragment>
))
```

### Module CSS

```jsx
import styles from '../nav.module.scss'
;<h1 className={`${styles['active-nav']} ${styles.red}`}>Hello</h1>
```

### Nested components

```jsx
// Tách riêng Child ra vì Child ở trong Parent bị re-define khi Parent re-render
const Child = ({ onClick }) => {
  return <button onClick={onClick}>+</button>
}

const Parent = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)
  return <Child onClick={handleClick} />
}
```

### Portal

Common use case: When the child components need to visually break out of the parent container.

```jsx
import { createPortal } from 'react-dom'
const MyComponent = () => {
  return (
    <div>
      {createPortal(
        <h2>This h2 will be brought to #portal</h2>,
        document.querySelector('#portal'), // nơi render trong index.html
      )}
    </div>
  )
}
```
