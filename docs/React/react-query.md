---
title: 'React Query'
---

## [Basic Queries](https://tanstack.com/query/v5/docs/react/guides/queries)

```jsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

## [Query Keys](https://tanstack.com/query/v5/docs/guides/query-keys)

```js
// A list of todos
useQuery({ queryKey: ['todos'], ... })
// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})
// These 2 are the same, object key order doesn't matter
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
// But These 2 are different
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
// Variable depends
useQuery({queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId)})
```

## `status` vs `fetchStatus`

- `status: 'pending' | 'error' | 'success'`: **Do we have any `data` or not**?
- `fetchStatus: 'fetching' | 'paused' | 'idle'`: **Is `queryFn` running or not**?

## Stale queries

Stale queries are refetched automatically in the background when:

- New instances of the query mount.
- The window is refocused.
- The network is reconnected.
- The query is optionally configured with a refetch interval.

Most of the time you only need to adjust `staleTime`. The `gcTime` default (5 mins) is ok.

## Cache levl & Observer level

- **Cache level**: For each Query Key, there is only one cache entry, some options we provide to `useQuery` will affect that cache entry like `staleTime`
- **Observer level**: For each Query Key, there can be multiple observers. The basic way to create an observer is to call `useQuery`. Every time we do that, we create an observer, and our component will re-render when data changes. This of course means we can have multiple observers watching the same cache entry. Some options that work on observer level would be `select` or `keepPreviousData`. In fact, what's makes `select` so great for data transformations is the ability to watch the same cache entry, but subscribe to different slices of its data in different components.

  Example how many observers a query has (3 in this example):
  ![Observer example](https://d33wubrfki0l68.cloudfront.net/923bb92064234bd61bdb46e651fc769ddac738fe/f2711/blog/static/986ddce4accc50a039147674f2ece7c1/9bf66/observers.png)

## `invalidate` vs `refetch`

- `queryClient.invalidateQueries(['posts'])` **_(preferred)_** will set the query to `stale`. It will only refetch if the component is on the screen.
- `const { refetch } = useQuery(...)` will ALWAYS refetch even if the component hasn't mounted. Usually you don't have access to `refetch` because it is returned from `useQuery`.

## React Query with Next.js

```jsx
import { useQuery } from '@tanstack/react-query'

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}

export default function Page({ posts }) {
  // Có sẵn data lúc pre-render, vào xong sẽ refetch lại một lần nữa
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json(),
      ),
    initialData: posts,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <p className="text-2xl">{isFetching && 'Fetching...'}</p>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```
