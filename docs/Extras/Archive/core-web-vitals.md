---
title: 'Core Web Vitals'
---

![CWV](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1660456914%2Fpatterns.dev%2Fweb-vitals.png&w=1920&q=75)

**Core Web Vitals** are a **subset** of **Performance Metrics**, defined by Google, aim to provide unified guidance for quality signals that are essential to delivering a <u>great user experience</u> on the web, while **Performance Metrics** evaluate <u>many different aspects</u> like server-side performance, resource optimization, and JavaScript execution time.

The metrics that make up **Core Web Vitals** will evolve over time. The current set for 2020 focuses on three aspects of the user experience—_loading (**LCP**)_, _interactivity (**FID**)_, and _visual stability (**CLS**)_.

## [Largest Contentful Paint (LCP)](https://web.dev/lcp/)

**LCP** measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page.

**LCP** measures the **loading performance** of a web page.

Improve **LCP** by: Optimized image component or even before delivered, lazy loading. [Read more](https://web.dev/optimize-lcp/)

:::caution
This is not **First Contentful Paint (FCP)**, which measures the time from when the page begins to load to when the first element is rendered on screen.
:::

## [First Input Delay (FID)](https://web.dev/fid/) ~~ Total Blocking Time (TBT)

**FID** measures the delay users experience between initiating an interaction (e.g., clicking a button) and the browser responding to that interaction.

Improve **FID** by: Reduce the amount of JavaScript executed on page load by using code splitting, removing unused code, and deferring non-critical JavaScript. [Read more](https://web.dev/optimize-fid/)

:::info
This will soon be replaced by [Interaction to Next Paint - INP](https://web.dev/inp/)
:::

## [Cumulative Layout Shift (CLS)](https://web.dev/cls/)

**CLS** occurs when elements have been shifted after initially being rendered by the DOM. Ex: A `button` is rendered after the `text block`, causing the `text` to shift downward.

**CLS** measure your site’s **overall layout stability**.

Improve **CLS** by: Skeleton & Placeholder. [Read more](https://web.dev/optimize-cls/)

![Cumulative Layout Shift (CLS)](https://nextjs.org/static/images/learn/seo/cls-example.png)

## How to improve [Lighthouse Core Web Vitals](https://web.dev/performance-scoring)

### [`next/image`](https://nextjs.org/docs/basic-features/image-optimization)

**Lazy load**: Images are only loaded when they enter the viewport.

### [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)

```jsx
<input
  type="text"
  placeholder="Search"
  onChange={async (e) => {
    const { value } = e.currentTarget
    // Only load the module dynamically in the browser
    // after the user types in the search input
    const Fuse = (await import('fuse.js')).default
    const fuse = new Fuse(names)
    setResults(fuse.search(value))
  }}
/>
```

### [Dynamic Import for Components](https://nextjs.org/learn/seo/improve/dynamic-import-components)

Dynamically render React component that is not needed on the initial page load

```jsx
import dynamic from 'next/dynamic'
const CodeSample = dynamic(() => import('../components/CodeSample'), {
  ssr: false,
})
// Now, when `isModalOpen` is toggled to true for the first time, the JavaScript required will be requested.
isModalOpen && (
  <CodeSample isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
)
```

### [Optimizing Third-Party Scripts](https://nextjs.org/learn/seo/improve/third-party-scripts)

**Loading `script` early can delay page content to start render**
&rarr; With the Next.js `Script` component, you can add it anywhere in the component without needing to use `next/head`:

```jsx
import Head from 'next/head'
import Script from 'next/script';

function IndexPage() {
  return (
     <Head>
        <script src="https://early-load.com" />
      </Head>
    <div>
      <Script
        // allows u to decide when to fetch and execute a script for optimal loading.
        strategy="afterInteractive"
        src="https://load-later.com"
      />
    </div>
  );
}
```
