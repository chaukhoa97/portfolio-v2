---
title: 'Core Web Vitals'
---

### Largest Contentful Paint (LCP)

**LCP** measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page.  
***LCP** measures the **loading performance** of a web page.  

*Note: This is not First Contentful Paint (FCP), which measures the time from when the page begins to load to when the first element is rendered on screen.*

### First Input Delay (FID) == Total Blocking Time

**FID** measures the **interactivity** of a web page.

### Cumulative Layout Shift (CLS)

**CLS** occurs when elements have been shifted after initially being rendered by the DOM. Ex: A `button` is rendered after the `text block`, causing the `text` to shift downward.  
-> **CLS** measure your site’s **overall layout stability**
![Cumulative Layout Shift (CLS)](https://nextjs.org/static/images/learn/seo/cls-example.png)

### How to improve [Lighthouse Core web vitals](https://web.dev/performance-scoring/#lighthouse-8)

#### [next/image](https://nextjs.org/docs/basic-features/image-optimization)

```js
import Image from `next/image`
```

#### [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)

```jsx
<input
  type="text"
  placeholder="Search"
  onChange={async (e) => {
    const { value } = e.currentTarget;
    // Only load the module dynamically in the browser
    // after the user types in the search input
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(names);
    setResults(fuse.search(value));
  }}
/>
```

#### [Dynamic Import for Components](https://nextjs.org/learn/seo/improve/dynamic-import-components): Dynamically render React component that is not needed on the initial page load

```jsx
import dynamic from 'next/dynamic';
const CodeSample = dynamic(() => import('../components/CodeSample'), {
  ssr: false,
});
// Now, when `isModalOpen` is toggled to true for the first time, the JavaScript required will be requested.
isModalOpen && (
  <CodeSample isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
);
```

#### [Optimizing Third-Party Scripts](https://nextjs.org/learn/seo/improve/third-party-scripts)

**Loading `script` early can delay page content to start render**
-> With the Next.js `Script` component, you can add it anywhere in the component without needing to use `next/head`:

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
