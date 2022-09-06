---
title: 'React Query'
---

## [Query Keys](https://tanstack.com/query/v4/docs/guides/query-keys)

```js
// A list of todos
useQuery(['todos', 'whatever'], ...)
// An individual todo in a "preview" format
useQuery(['todo', 5, { preview: true }], ...)
// These 2 are the same, object key order doesn't matter
useQuery(['todos', { status, page }], ...)
useQuery(['todos', { page, status }], ...)
// But These 2 are different
useQuery(['todos', status, page], ...)
useQuery(['todos', page, status], ...)
// Variable depends
useQuery(['todos', { type, id }], () => fetch(type, id))
```