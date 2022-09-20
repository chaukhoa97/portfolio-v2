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

- `status: 'loading'| 'error' | 'success'`: **Do we have any `data` or not**?
- `fetchStatus: 'fetching' | 'idle' | 'paused'`: **Is `queryFn` running or not**?

## Stale queries

Stale queries are refetched automatically in the background when:

- New instances of the query mount.
- The window is refocused.
- The network is reconnected.
- The query is optionally configured with a refetch interval.

Most of the time you only need to adjust `staleTime`. The `cacheTime` default (5 mins) is ok.

## `invalidate` vs `refetch`

- `queryClient.invalidateQueries(['posts'])` will set the query to `stale` so it will refetch when the component mount.
- `const { refetch } = useQuery(...)` will always refetch even if the component is not mounted. Usually you don't have access to `refetch` because it is returned from `useQuery`.
