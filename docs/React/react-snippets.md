---
title: 'React Snippets'
---

## Module CSS

```jsx
import s from '../Nav.module.scss'
return <h1 className={`${s['active-nav']} ${s.red}`}>Hello</h1>
```

## Flatten object (useful for nested state)

```js
// From this...
const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [
    {
      id: 1,
      title: 'Earth',
      childPlaces: [
        {
          id: 2,
          title: 'Africa',
          childPlaces: [
            {
              id: 3,
              title: 'Botswana',
              childPlaces: [],
            },
          ],
        },
      ],
    },
  ],
}

// ...to this
const flatTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34],
  },
}
```

## Different content on client and server

```jsx
function MyComponent() {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    // Effect does not run on the server
    setDidMount(true)
  }, [])

  if (didMount) {
    // ... return client-only JSX ...
  } else {
    // ... return initial JSX on the server ...
  }
}
```

## Show `obj` ra page

```jsx
<pre>{JSON.stringify(data, null, 2)}</pre>
```

## Conditional HTML tag

```jsx
const MyButton = (props) => {
  if (props.href) {
    return <a {...props} />
  }
  return <button {...props} />
}

const UnsetComponent = ({ as, ...props }) => {
  return <as />
}
const MyComponent = () => {
  return <UnsetComponent as="div" />
}
```

## Next.js Hydration Error

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

```jsx
const id = useId()

const App = () => {
  return <Element key={id} />
}

// Hoặc
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

const App = () => {
  return mounted && <Element />
}
```

## [`typeof window` checks](https://remix.run/docs/en/v1/pages/gotchas#typeof-window-checks)

```js
if (typeof document === 'undefined') {
  // running in a server environment
} else {
  // running in a browser environment
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

## Force Re-render

```jsx
const [, forceRerender] = useState()
forceRerender({})
```
