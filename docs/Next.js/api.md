---
title: 'API'
---

## [`next/link`](https://nextjs.org/docs/api-reference/next/link)

### Comparing with `router.push`

Cả 2 đều là _Client-side route transitions_, tuy nhiên `router.push` không tạo ra `<a>` tag &rarr; your links won't be detected by crawlers.

## pages/\_document.js

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // Thêm vào `data-theme`
    <Html data-theme="dracula">
      <Head>
        {/* Optimized font */}
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
