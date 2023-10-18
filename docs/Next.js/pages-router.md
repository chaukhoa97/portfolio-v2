---
title: 'Pages Router Specific'
---

## Pre-rendering

By default, Next.js pre-renders every page. It means when there's a request, Next.js will pre-render the HTML page with its static content, instead of letting client-side JS do all the work like CSR -> **Improvement in SEO, FCP, LCP** compared to CSR.
Each generated HTML is also associated with minimal JavaScript code to make the page fully interactive after it is loaded by the browser (This process is called `hydration`).

[SSG](#static-site-generation), [ISR](#incremental-static-regeneration), [SSR](#server-side-rendering) are 3 ways Next.js pre-renders pages.

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![No Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

## [Static-site Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

> **SSG** generates the HTML at build time. The pre-rendered HTML is then reused on each request.

**Usage**: Dùng cho những page có content ít/kbh thay đổi: FAQ, Policy,...

![Static-site Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

### Prefetching with JSON file created by SSG and ISG

SSG (and ISG) also generate a JSON file besides the HTML. It's used for **Client-side routing** (Page transitions are handled by JS, similar to a SPA) when users navigate by `next/link` to those **static** pages. The JSON is passed as the `props` for the `PageComponent`.  
In addition, any `<Link />` **in the viewport** (initially or through scroll) to pages that haven't been pre-rendered will also be <u>generated & prefetched</u> by default.  
Although SSG generates 2 files (HTML and JSON), when prefetching, **only** the JSON file is downloaded for Client-side routing.

<details>
  <summary>The JSON's format is like this:</summary>

```json
{
  "pageProps": {
    "post": {
      "id": 57,
      "title": "sed ab est est"
    }
  },
  "__N_SSG": true
}
```

</details>

## [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

> **ISG** allows you to create & update static pages after the **Build time**.

**Usage**: Dùng cho những page có content dc update thường xuyên but it's NOT important for the user to see the up-to-date data: Blog, Product Detail, ...

Khi gặp 1 trong 2 case dưới đây, Next.js sẽ trigger generate static page ở server:

### First case - by `getStaticProps` using `revalidate`

1. The initial request to the product page will show the cached page (giống `SSG`)
2. The data for the product is updated in the CMS.
3. Any requests to the page after the initial request and before the 60 seconds window will show the cached page with old data.
4. After the 60 second window, the next request will still show the same cached page with old data, but Next.js will now trigger a regeneration of the page in the background.
5. Once the page has been successfully generated, Next.js will invalidate the cache and show the updated product page. If the background regeneration fails, the old page remains unaltered.

### Second case - by `getStaticPaths` using `fallback: 'blocking'(preferred)/ true`

```js title="pages/products/[id].js"
export async function getStaticPaths() {
  const products = await getTop1000Products()
  const paths = products.map((product) => ({
    params: { id: product.id },
  }))

  return { paths, fallback: 'blocking' } // hoặc `fallback: true`
}
```

:::note

Nếu dùng cách này, khi trên screen có ~ `next/link`**(ko phải `<a>`)** dẫn đến ~ page **CHƯA** dc pre-render (ko dc return từ `getStaticPaths`), Next.js cũng sẽ trigger generate static page cho tất cả ~ page đó, đúng với default behavior của `next/link`.

:::

Use case: Đẻ 1000 most popular products từ `getStaticPaths`

- `fallback: blocking` **_(preferred)_** – when a request is made to a page that hasn't been generated, Next.js will `SSR` the page on the first request and cache it. Future requests will serve the static file from the cache.
- `fallback: true` _(gõ URL thay vì click vào `<Link>` sẽ dính error)_– when a request is made to a page that hasn't been generated, Next.js will immediately serve a static page with a loading state on the first request. When the data is finished loading, the page will re-render using this data and be cached. Future requests will serve the static file from the cache.
- `fallback: false` - 404 page will be served.

### [On-demand ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation)

Allows you to **proactively** create & update static pages when specific events occur, instead of periodical update using [`revalidate`](#first-case---by-getstaticprops-using-revalidate). This can be done by accessing a route in `api` folder (manually or with a webhook).

```js title="pages/api/revalidate.js"
// https://<your-site.com>/api/revalidate?secret=<token>
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/path-to-revalidate')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
```

## [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

> `getServerSideProps`: Next.js will pre-render the HTML at the time the user request instead of the build time and then return the HTML to the user.

**Usage**: Important for the user to see most up-to-date data: Pages whose content is based on user input: Search result by keyword, ...

TTFB chậm nhất (do Server phải Generate lại page rồi mới gửi lại cho user), nhưng tổng thể sau cùng thì load nhanh hơn `CSR` (ko đáng kể).

![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

## [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side)

Cách cơ bản nhất là sử dụng [`useEffect` để fetch data về ở Client](../React/hooks.mdx#snippets).  
Nên kẹp chung với [TanStack Query](https://github.com/TanStack/query/releases) hoặc [Vercel SWR](https://github.com/vercel/swr/releases).

**Usage**:

- SEO tệ (do k có pre-render), usually used for personalized content.
- Important for the user to see most up-to-date data.
- Có thể cho người dùng thấy layout trước (Skeleton) so với `SSR`.
  &rarr; Dùng cho những page như: Dashboard, Cart, ...

![Client-side Rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

## Data Fetching

### `getStaticProps` + `getStaticPaths`

These 2 functions only runs at build time on server.

#### `getStaticProps`

If you export a function called `getStaticProps` (Static Site Generation) from a page, **Next.js will pre-render this page at build time using the props returned by `getStaticProps`**.

#### `getStaticPaths`

If a page has [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) and uses `getStaticProps`, it needs to define a list of paths to be statically generated.

When you export a function called `getStaticPaths` (Static Site Generation) from a page that uses dynamic routes, **Next.js will statically pre-render all the paths specified by `getStaticPaths`**.

```jsx title='pages/[id].jsx'
// [id].jsx -> các obj trong `paths[]` phải có dạng { params: { id: '1' } }
export const getStaticPaths = async () => {
  // Fetch or do something...
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }]
  return { paths, fallback: 'blocking' }
}

// `context` là object có nhiều property (đọc API của `getStaticProps`)
// Trong đó quan trọng nhất là `params` - Route params for pages using Dynamic routes.
// [id].jsx -> context = { params: { id: ... }, locales... }
export const getStaticProps = async (context) => {
  const {
    params: { id },
  } = context

  // `paths` ở đây KHÔNG dùng để lựa các page để pre-render như `getStaticPaths`, mà chỉ để render các Link trong NavBar
  const paths = [{ params: { id: '3' } }, { params: { id: '4' } }]

  if (!id) {
    return {
      notFound: true,
      // hoặc
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { id, paths }, // `id`, `paths` will be passed to the Page component as props
    revalidate: 60,
  }
}

export default function Page({ id, paths }) {
  return (
    <div className="flex">
      <div className="w-1/4">
        {paths.map((path) => (
          <Link href={path.params.id} key={path.params.id}>
            <a className="mx-4 text-primary-400">Link {path.params.id}</a>
          </Link>
        ))}
      </div>
      <h3 className="w-3/4 text-3xl">ID: {id}</h3>
    </div>
  )
}
```

### `getServerSideProps`

Run on every request. Syntax giống hệt `getStaticProps`

If you export a function called `getServerSideProps` (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`.

## Snippets

### Hydration Error

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

### pages/document.js

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // Thêm vào `data-theme`
    <Html data-theme="dracula">
      <Head>
        {/* Add font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      {/* Thêm vào ` className="bg-dark" ` */}
      <body className="bg-dark">
        {/* Thêm vào <div> portal */}
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```
