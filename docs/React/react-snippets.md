---
title: 'Snippets'
---

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
