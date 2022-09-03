---
title: 'Snippets'
---

### Hydration Error React 18 + Next.js

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

```jsx
const id = useId()
const [mounted, setMounted] = useState(false)
const App = () => {
  return <Element key={id} />
  // Hoặc
  return mounted && <Element />
}
```

## Show obj ra page

```jsx
<pre>{JSON.stringify(data, null, 2)}</pre>
```

## Module CSS

```jsx
import styles from '../nav.module.scss'
return <h1 className={`${styles['active-nav']} ${styles.red}`}>Hello</h1>
```

## Portal

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

## Icon

```jsx title='ChevronRight.tsx'
const ChevronRight = ({ ...props }) => {
  return (
    <svg width="24" height="24" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default ChevronRight
```
