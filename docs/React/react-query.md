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

## Cache levl & Observer level

- **Cache level**: For each Query Key, there is only one cache entry, some options we provide to `useQuery` will affect that cache entry like `staleTime`
- **Observer level**: For each Query Key, there can be multiple observers. The basic way to create an observer is to call `useQuery`. Every time we do that, we create an observer, and our component will re-render when data changes. This of course means we can have multiple observers watching the same cache entry. Some options that work on observer level would be `select` or `keepPreviousData`. In fact, what's makes `select` so great for data transformations is the ability to watch the same cache entry, but subscribe to different slices of its data in different components.

  Example how many observers a query has (3 in this example):
  ![Observer example](https://d33wubrfki0l68.cloudfront.net/923bb92064234bd61bdb46e651fc769ddac738fe/f2711/blog/static/986ddce4accc50a039147674f2ece7c1/9bf66/observers.png)

## `invalidate` vs `refetch`

- `queryClient.invalidateQueries(['posts'])` will set the query to `stale` so it will refetch when the component mount.
- `const { refetch } = useQuery(...)` will always refetch even if the component is not mounted. Usually you don't have access to `refetch` because it is returned from `useQuery`.
