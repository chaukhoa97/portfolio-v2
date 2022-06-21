---
title: 'React Bugs'
---

### Hydration Error React 18 + Next.js

```jsx
const [mounted, setMounted] = useState(false);
{
  mounted && <HydrationErrorElement />;
}
```
