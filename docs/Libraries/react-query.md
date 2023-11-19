---
title: 'React Query'
---

## [Basic Queries](https://tanstack.com/query/latest/docs/react/guides/queries)

```jsx
// queryFn can be any function that **returns a promise** (should either resolve the data or throw an error)
const axiosFetchData = ({ queryKey }) => {
  // Access the key, type and id variables in your query function
  const [_key, { type, id }] = queryKey
  return axios
    .get(`https://jsonplaceholder.typicode.com/${type}/${id}`)
    .then((res) => res.data)
}

// Query function with `fetch`: Must check for `ok` status because `fetch` doesn't throw errors
const fetchData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['basic', { type: 'todos', id: 1 }] // `key, type, id` as above
    queryFn: axiosFetchData,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return data.map((todo) => <div key={todo.id}>{todo.title}</div>)
}
```

## [Query Keys](https://tanstack.com/query/latest/docs/guides/query-keys)

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

## Why using React Query instead of `useEffect`?

Let's say we have a parent that has many children, 2 of them need the same data on the server.

- Having the data fetching in them via `useEffect` will have the same fetch called two times.
- But lifting the state up by having the data fetching at the parent level (which later can be passed to the 2 children via `props`) might cause all other children, who don't care about the data, rerender whenever the parent update its state from the data fetching result.

React Query **caches** the data, so we don't need to have concern about fetching the same data in mutiple components.

## `status` vs `fetchStatus`

- `status: 'pending' | 'error' | 'success'`: **Do we have any `data` or not**?
- `fetchStatus: 'fetching' | 'paused' | 'idle'`: **Is `queryFn` running or not**?

## Stale queries

Stale queries are refetched automatically in the background when:

- New instances of the query mount.
- The window is refocused.
- The network is reconnected.
- The query is optionally configured with a refetch interval.

Most of the time you only need to adjust `staleTime` (default is 0). The `gcTime` 5 mins default is ok.

## Cache level & Observer level

- **Cache level**: For each Query Key, there is only one cache entry, some options we provide to `useQuery` will affect that cache entry like `staleTime`
- **Observer level**: For each Query Key, there can be multiple observers. The basic way to create an observer is to call `useQuery`. Every time we do that, we create an observer, and our component will re-render when data changes. This of course means we can have multiple observers watching the same cache entry. Some options that work on observer level would be `select` or `keepPreviousData`. In fact, what's makes `select` so great for data transformations is the ability to watch the same cache entry, but subscribe to different slices of its data in different components.

  Example how many observers a query has (3 in this example):
  ![Observer example](https://d33wubrfki0l68.cloudfront.net/923bb92064234bd61bdb46e651fc769ddac738fe/f2711/blog/static/986ddce4accc50a039147674f2ece7c1/9bf66/observers.png)

## `invalidate` vs `refetch`

- `queryClient.invalidateQueries(['posts'])` **_(preferred)_** will set the query to `stale`. It will only refetch if the component is on the screen.
- `const { refetch } = useQuery(...)` will ALWAYS refetch even if the component hasn't mounted. Usually you don't have access to `refetch` because it is returned from `useQuery`.

## Snippet: Infinite Queries

```jsx
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const Infinited = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) =>
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            pageParam * 10
          }&limit=10`,
        )
        .then((res) => res.data),
    initialPageParam: 113,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next
        ? lastPage.next.split('offset=')[1].split('&')[0] / 10
        : null
    },
  })

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, index) => (
        <div key={index}>
          {page.results.map((result, index) => (
            <div key={index}>
              {index}. {result.name}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
      <div>{isFetching && 'Fetching...'}</div>
    </>
  )
}

export default Infinited
```

## Snippet: Pagination Queries

```jsx
import { useEffect, useState } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const sampleApiReturn = {
  count: 1154,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=1140&limit=10',
  previous: 'https://pokeapi.co/api/v2/pokemon/?offset=1120&limit=10',
  results: [
    {
      name: 'urshifu-single-strike-gmax',
      url: 'https://pokeapi.co/api/v2/pokemon/10226/',
    },
    {
      name: 'urshifu-rapid-strike-gmax',
      url: 'https://pokeapi.co/api/v2/pokemon/10227/',
    },
  ],
}

const Paginated = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['paginated', page],
      queryFn: () =>
        axios
          .get(
            `https://pokeapi.co/api/v2/pokemon/?offset=${page * 10}&limit=10`,
          )
          .then((res) => res.data),
    })

  useEffect(() => {
    // Prefetch the next page when page changes
    queryClient.prefetchQuery({
      queryKey: ['paginated', page + 1],
      queryFn: () =>
        axios
          .get(
            `https://pokeapi.co/api/v2/pokemon/?offset=${
              (page + 1) * 10
            }&limit=10`,
          )
          .then((res) => res.data),
    })
  }, [page, queryClient])

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h1 className="text-3xl text-red-500">{page}</h1>
      {data.results.map((result) => (
        <div
          key={result.id}
          className={isPlaceholderData ? 'text-gray-500' : 'text-white'}
        >
          {result.name}
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!data.previous}
          onClick={() => {
            setPage((p) => Math.max(p - 1, 0))
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          // Disable if the current page data is still being fetched or if there is no next page (from `sampleApiReturn` above)
          disabled={isPlaceholderData || !data.next}
          onClick={() => {
            setPage((p) => p + 1)
          }}
        >
          Next
        </button>
        {isFetching ? (
          <span> The current page data is being fetched...</span>
        ) : null}
      </div>
    </>
  )
}

export default Paginated
```

## Snippet: React Query with Next.js Page Router

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
