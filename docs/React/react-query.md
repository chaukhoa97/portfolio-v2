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

## `status` vs `fetchStatus`

- `status: 'loading'| 'error' | 'success'` answers **Do we have any `data` or not**?
- `fetchStatus: 'fetching' | 'idle' | 'paused'` answers **Is `queryFn` running or not**?

## `queryClient.invalidateQueries(['basic query', { type, id }])` vs `refetch()` in `useQuery`

- `invalidate` will set the query to `stale` so it will refetch when the component mount.
- `refetch` will always refetch even if the component is not mounted.

Usually you don't have access to `refetch` because it is returned from `useQuery`.
