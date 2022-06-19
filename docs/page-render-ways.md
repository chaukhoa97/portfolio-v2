---
title: 'Page Render Ways'
category: 'Nextjs'
draft: false
---

### [Static-site Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

Ngoài đẻ HTML ra, SSG còn đẻ ra 1 file `JSON` là kq dc return từ `getStaticProps`. Khi navigate sang ~ page dc pre-render, Next.js sẽ lấy file `JSON` này làm prop cho `page component`. As a result, client-side page transitions will **NOT** call `getStaticProps` vì đã có sẵn JSON mà dùng rồi.

File JSON có dạng:

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

![](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

#### [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) `(revalidate: 60)`

![](https://vercel.com/_next/image?url=%2Fdocs-proxy%2Fstatic%2Fdocs%2Fconcepts%2Fnext.js%2Fisr%2Fregeneration.png&w=1080&q=75)
Tạo Paths with ISR: Đẻ 100 most popular products từ `getStaticPaths`, user request product khác thì kẹp thêm `fallback`: `true`(`router.isFallback?loading...`) hoặc `'blocking'` (bắt đầu load trang bằng SSR).

1. The initial request to the product page will show the cached page(just like SSG)
2. The data for the product is updated in the CMS.
3. Any requests to the page after the initial request and before the 60 seconds window will show the cached page with old data.
4. After the 60 second window, the next request will still show the same cached page with old data, but Next.js will now trigger a regeneration of the page in the background.
5. Once the page has been successfully generated, Next.js will invalidate the cache and show the updated product page. If the background regeneration fails, the old page remains unaltered.

### [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

Khi user request, `getServerSideProps` ko tạo HTML ở build time như SSG mà chỉ tạo file JSON(format giống như trên) làm prop cho page componnent, từ đó render ra trang HTML và trả về cho client.

![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

### Client-side Rendering

![](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

```jsx
useEffect(() => {
  fetch('api/profile-data')
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    });
}, []);
```
