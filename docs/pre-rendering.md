---
title: 'Pre-rendering'
category: 'Nextjs'
draft: false
---

By default, Next.js pre-renders every page. Nghĩa là Next.js sẽ tạo trước HTML, thay vì để JS ở client-side làm hết.  
Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration`).

![](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)
