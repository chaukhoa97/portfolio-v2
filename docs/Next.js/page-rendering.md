---
title: 'Page Rendering'
---

## Pre-rendering

By default, Next.js pre-renders every page. It means when there's a request, Next.js will pre-render the HTML page with its static content, instead of letting client-side JS do all the work like CSR.  
Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration`).

[SSG](#static-site-generation), [ISR](#incremental-static-regeneration), [SSR](#server-side-rendering) are 3 ways Next.js pre-renders pages.

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![No Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

## [Static-site Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

### Introduction

> **SSG** is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

**Usage**: Dùng cho những page có content ít/kbh thay đổi: FAQ, Policy,...

![Static-site Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

### `next/link` with JSON

SSG (and ISG) also generate a JSON file beside the HTML. It's used for **Client-side routing** (Page transitions are handled by JS, similar to a SPA) when the user navigates to the **static** pages by `next/link` by having this JSON as the `props` for the `PageComponent`.  
In addition, any `<Link />` **in the viewport** (initially or through scroll) to pages that haven't been pre-rendered will also be generated & prefetched by default.  
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

### Introduction

> **ISG** allows you to create & update static pages sau khi after the _Build time_.

**Usage**: Dùng cho những page có content dc update thường xuyên but it's not important for the user to see most up-to-date data: Blog, Product Detail, ...

Khi gặp 1 trong 2 case dưới đây, Next.js sẽ trigger generate static page ở server:

### First case - by `getStaticProps` using `revalidate`

1. The initial request to the product page will show the cached page (giống `SSG`)
2. The data for the product is updated in the CMS.
3. Any requests to the page after the initial request and before the 60 seconds window will show the cached page with old data.
4. After the 60 second window, the next request will still show the same cached page with old data, but Next.js will now trigger a regeneration of the page in the background.
5. Once the page has been successfully generated, Next.js will invalidate the cache and show the updated product page. If the background regeneration fails, the old page remains unaltered.

### Second case - by `getStaticPaths` using `fallback: 'blocking'(preferred)/true`

Nếu dùng cách này, khi trên màn hình có ~ `next/<Link>`**(KHÔNG phải `<a>`)** dẫn đến ~ page chưa dc pre-render, Next.js sẽ trigger generate static page cho tất cả các page đó.

```js title="pages/products/[id].js"
export async function getStaticPaths() {
  const products = await getTop1000Products()
  const paths = products.map((product) => ({
    params: { id: product.id },
  }))

  return { paths, fallback: 'blocking' } // hoặc `fallback: true`
}
```

Use case: Đẻ 1000 most popular products từ `getStaticPaths`

- `fallback: blocking` **_(preferred)_** – when a request is made to a page that hasn't been generated, Next.js will `SSR` the page on the first request and cache it. Future requests will serve the static file from the cache.
- `fallback: true` _(gõ URL thay vì click vào `<Link>` sẽ dính error)_– when a request is made to a page that hasn't been generated, Next.js will immediately serve a static page with a loading state on the first request. When the data is finished loading, the page will re-render using this data and be cached. Future requests will serve the static file from the cache.

---

- `fallback: false` - 404 page will be served.

### [On-demand ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation)

Pending...

## [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

### Introduction

> `getServerSideProps`: Next.js will pre-render the HTML at the time the user request instead of the build time and then return the HTML to the user.

**Usage**:

- SEO is critical.
- Important for the user to see most up-to-date data.
- TTFB chậm nhất (do Server phải Generate lại page rồi mới gửi lại cho user), nhưng tổng thể sau cùng thì load nhanh hơn `CSR` (ko đáng kể).  
  &rarr; Dùng cho những page cần SEO, và content của page dc dựa theo input (Ex: search) từ user: Search result ...

![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

## [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side)

Cách cơ bản nhất là sử dụng [`useEffect` để fetch data về ở Client](../React/react-snippets.md/#async-function-in-useeffect).  
Nên kẹp chung với [TanStack Query](https://github.com/TanStack/query/releases) hoặc [Vercel SWR](https://github.com/vercel/swr/releases).

### Usage

- SEO tệ (do k có pre-render), usually used for personalized content.
- Important for the user to see most up-to-date data.
- Có thể cho người dùng thấy layout trước (Skeleton) so với `SSR`.
  &rarr; Dùng cho những page như: Dashboard, Cart, ...

![Client-side Rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)
