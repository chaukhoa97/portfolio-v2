---
title: 'App Router Specific'
---

## React Server Components

Server Components never re-render or hydrate. They run *once* on the server to generate the UI. The rendered value is sent to the client and locked in place. As far as React is concerned, this output is immutable, and will never change. They are suitable for components that fetch data from server and do not have interactivity (`useState`, `onClick`) or Browser-only APIs (`localtSorage`).

### Pros

- RSC code isn't included in the JS bundle, thus reducing the amount of JS -> improve **Page Interactive** (TTI). For example, there are some cases in which we need to do a heavy task that requires a huge size of JS in a component e.g. syntax highlighting. If we do it in a SC, none of the library code will be included in our JS bundle.
- Unlike traditional SSR where we have to call the server multiple times e.g. 1st Prerender HTML and 2nd Get data, in RSC we can perform all of them in a single call to the server.
- Because RSC code only runs on the server, it helps keep sensitive data and logic on the server.
- All other [pre-rendering pros](pages-router.md#pre-rendering) (SEO, FCP, LCP) because they are similar in that they all create the HTML on the server **compared to CSR**.
- The layout system is intuitive and feels great to work with, similar to Remix.

### Vs Client Components

- In the RSC paradigm, all components are SC by default unless we explicitly write `'use client'` to specify Client components.
- In Next.js App Router, client components are still pre-rendered similar to [Pages Router’s SSR](pages-router.md#server-side-rendering)

:::note

The name “Client Component” implies that these components *only* render on the client, but that's not actually true. **Client Components render on both the client *and* the server.**

:::

### Cons

Not stable, React canary version, Extremely slow hot reload, extends the native `fetch` API which leads to unexpected/ unpredictable behavior, and many other bugs.

### Client Boundary

![Client Boundary](https://i.imgur.com/RNQTVuX.png)

Because RSC can't rerender, **Client Components can only import other Client Components**
When we add the `'use client'` directive to the `Article` component, we create a “client boundary”. All of the components within this boundary are **implicitly** converted to Client Components. Even though components like `HitCounter` don't have the `'use client'` directive, they'll still hydrate/ render on the client in this particular situation. The `HitCounter` component can still be rendered as Server Component in other situations, if it is imported somewhere else by a Server Component.

This means we don't have to add `'use client'` to every single file that needs to run on the client. In practice, we only need to add it when we're creating new client boundaries.

:::note

When it comes to client boundaries, the parent/child relationship doesn't matter. Only the import relationship matters.

```jsx
import ServerComponent from './ServerComponent'
import ClientComponent1 from './ClientComponent1'
import ClientComponent2 from './ClientComponent2'

// This works as expected
function ParentServerComponent() {
  return (
    <ServerComponent>
      <ClientComponent1 />
      <ClientComponent2 />
    </ServerComponent>
  )
}
```

Remember, the problem we're trying to solve is that Server Components can't re-render, and so they can't be given new values for any of their props. With this new setup, `ParentServerComponent` decides what the `props` are for `ClientComponent1` and `ClientComponent2`, and since `ParentServerComponent` is a Server Component, there's no problem.

:::

## `layout` vs `template`

`template` create a new instance of the component when navigating between pages unlike `layout`'s is persisted e.g. showing page view count. `template` is rendered between a layout and its children.

Read more: <https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates>

```jsx
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

## How Routing and Navigation Works

When a user navigates to a new route, the browser doesn't reload the page, and only the **route segments** that change re-render.

Read more: <https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works>

## Data Fetching

### `fetch` API

Next.js extends (**actually override**) the native `fetch` Web API to allow you to configure the caching and revalidating behavior for each fetch request on the server. You can use `fetch` whenever you need the data without worrying about the performance implications of making multiple requests for the same data. This is possible because fetch requests are automatically memoized.

### Parallel and Sequential Data Fetching

Next.js by default use _Sequential Data Fetching_ because the child component might depend on the result of the parent component's data fetching. If you want to use _Parallel Data Fetching_, you can use `Promise.all()`.

Read more: <https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-and-sequential-data-fetching>

```jsx
async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getArtistAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({ params: { username } }) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)
  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return ...
}
```
