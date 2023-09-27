---
title: 'API'
---

## Next.js Hydration Error

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

## [`next/link`](https://nextjs.org/docs/api-reference/next/link)

### Comparing with `router.push`

Cả 2 đều là _Client-side route transitions_, tuy nhiên `router.push` không tạo ra `<a>` tag &rarr; **Your links won't be detected by crawlers**.

## pages/\_document.js

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
