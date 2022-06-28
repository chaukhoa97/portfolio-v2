---
title: 'Page Rendering'
---

### [Static-site Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

**SSG** is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

Ngoài đẻ HTML ra, SSG còn đẻ ra 1 file `JSON` là kq dc return từ `getStaticProps`. Khi navigate sang ~ `<Page>` dc pre-render, Next.js sẽ lấy file `JSON` này làm prop cho ~ `<Page>` đó. As a result, client-side page transitions will **NOT** call `getStaticProps` vì đã có sẵn JSON mà dùng rồi.

Dùng cho những page có content ít/kbh thay đổi: FAQ, Policy, ...

#### File JSON có dạng

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

![Static-site Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

### [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)

Cho phép create/update static pages sau khi đã `next build`. Khi gặp 1 trong 2 case dưới đây, Next.js sẽ trigger generate static page ở server.

Dùng cho những page có content dc update thường xuyên but it's not important for the user to see most up-to-date data: Blog, Product Detail, ...

#### First case - by `getStaticProps revalidate`

![ISG by `getStaticProps`](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fconcepts%2Fnext.js%2Fisr%2Fregeneration.png&w=1080&q=75)

1. The initial request to the product page will show the cached page (giống `SSG`)
2. The data for the product is updated in the CMS.
3. Any requests to the page after the initial request and before the 60 seconds window will show the cached page with old data.
4. After the 60 second window, the next request will still show the same cached page with old data, but Next.js will now trigger a regeneration of the page in the background.
5. Once the page has been successfully generated, Next.js will invalidate the cache and show the updated product page. If the background regeneration fails, the old page remains unaltered.

#### Second case - by `getStaticPaths`

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

- `fallback: blocking` (preferred) – when a request is made to a page that hasn't been generated, Next.js will server-render the page on the first request. Future requests will serve the static file from the cache.
- `fallback: true` – when a request is made to a page that hasn't been generated, Next.js will immediately serve a static page with a loading state on the first request. When the data is finished loading, the page will re-render using this data and be cached. Future requests will serve the static file from the cache.

#### [Next.js API route](https://nextjs.org/docs/api-routes/introduction) + [On-demand ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation): Wish list

### [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

`getServerSideProps` ko tạo HTML ở build time như SSG. Thay vào đó mỗi khi user request, Next.js sẽ tạo file JSON [format giống như trên](#file-json-có-dạng), từ đó render ra trang HTML và trả về cho client.

- Important for the user to see most up-to-date data.
- SEO is critical.
- TTFB chậm hơn `CSR`, nhưng tổng thể sau cùng thì load nhanh hơn (ko đáng kể).  
  &rarr; Dùng cho những page từ input người dùng: Search result ...

![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

### [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side)

Cách cơ bản nhất là sử dụng [`useEffect` để fetch data về ở Client](../Snippets//react-snippets.md/#async-function-in-useeffect).  
Nên kẹp chung với [TanStack Query](https://github.com/TanStack/query/releases) hoặc [Vercel SWR](https://github.com/vercel/swr/releases).

- Important for the user to see most up-to-date data.
- Không cần SEO (usually personalized content).
- Có thể cho người dùng thấy layout trước (Skeleton) so với `SSR`.  
  &rarr; Dùng cho những page như: Dashboard, Cart, ...

![Client-side Rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

### Summary

![Page-rendering ways conclusion](https://cdn.sanity.io/images/0lu0ii6t/production/e3c1bae9a50f0cf6a05be7661400d7deccf06dbb-1920x2200.jpg?w=1536&fm=webp&fit=min&auto=format)
