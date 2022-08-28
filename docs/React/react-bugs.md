---
title: 'React Bugs'
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
