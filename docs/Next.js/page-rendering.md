---
title: 'Page Rendering'
---

## Pre-rendering

By default, Next.js pre-renders every page. Nghĩa là Next.js sẽ tạo trước HTML, thay vì để JS ở client-side làm hết.  
Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration`).

[SSG](#static-site-generation), [ISR](#incremental-static-regeneration), [SSR](#server-side-rendering) are 3 ways Next.js pre-renders pages.

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![No Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

## [Static-site Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

### Usage

Dùng cho những page có content ít/kbh thay đổi: FAQ, Policy, ...

### Introduction

![Static-site Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

**SSG** is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.  
It also generates a JSON file.

File `JSON` có dạng:

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

### `next/link` with JSON

Khi navigate bằng `next/link` sang ~ _SSG Page (no SSR)_, Next.js sẽ thực hiện _Client-side route transition_ (Page transition are handled by JS, similar to a SPA) bằng cách lấy file JSON này làm `prop` cho `PageComponent`. Thus any `<Link />` **in the viewport** (initially or through scroll) will be generated & prefetched by default.  
Although SSG generate 2 file là HTML và JSON, tuy nhiên lúc prefetch thì chỉ có file JSON được prefetch để dùng cho Client-side routing.

:::danger

Ở đây ko fetch pre-rendered HTML, mà chỉ fetch JSON cho Client-side route transition

:::

## [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

### Usage

Dùng cho những page có content dc update thường xuyên but it's not important for the user to see most up-to-date data: Blog, Product Detail, ...

Cho phép create/update static pages sau khi đã `next build`. Khi gặp 1 trong 2 case dưới đây, Next.js sẽ trigger generate static page ở server.

### First case - by `getStaticProps` using `revalidate`

![ISG by `getStaticProps`](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fconcepts%2Fnext.js%2Fisr%2Fregeneration.png&w=1080&q=75)

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

`getServerSideProps` ko tạo HTML ở build time như SSG. Thay vào đó mỗi khi user request, Next.js sẽ tạo file JSON [format giống như trên](#file-json-có-dạng), từ đó render ra trang HTML ở server và trả về cho client.

### Usage

- Important for the user to see most up-to-date data.
- SEO is critical.
- TTFB chậm nhất (do Server phải Generate lại page rồi mới gửi lại cho user), nhưng tổng thể sau cùng thì load nhanh hơn `CSR` (ko đáng kể).  
  &rarr; Dùng cho những page cần SEO, và content của page dc dựa theo input (Ex: search) từ user: Search result ...

![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

## [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side)

Cách cơ bản nhất là sử dụng [`useEffect` để fetch data về ở Client](../Snippets//react-snippets.md/#async-function-in-useeffect).  
Nên kẹp chung với [TanStack Query](https://github.com/TanStack/query/releases) hoặc [Vercel SWR](https://github.com/vercel/swr/releases).

### Usage

- Important for the user to see most up-to-date data.
- Có thể cho người dùng thấy layout trước (Skeleton) so với `SSR`.
- SEO tệ (do k có pre-render), usually used for personalized content.
  &rarr; Dùng cho những page như: Dashboard, Cart, ...

![Client-side Rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)
