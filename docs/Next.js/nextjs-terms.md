---
title: 'Next.js Terms'
---

### Pre-rendering

By default, Next.js pre-renders every page. Nghĩa là Next.js sẽ tạo trước HTML, thay vì để JS ở client-side làm hết.  
Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration`).

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![No Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

### Other Terms

- **Client-side navigation**: Means that the page transition happens using JavaScript.
- **Lazy load**: Images are **lazy loaded** by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
