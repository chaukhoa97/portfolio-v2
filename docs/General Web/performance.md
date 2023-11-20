---
title: 'Performance'
---

## How to improve performance

### General (in order of familiarity)

| What                                   | How                                                                                                                                                                           | Example                                                                                                                                                                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ship the smallest JS bundle possible   | Use right tools for the job e.g. Astro for static sites. Choose well-maintained, small, and tree-shakeable packages.                                                          | -                                                                                                                                                                                                                                     |
| Lazy/ Dynamic Loading (Code Splitting) | Split JS bundles into smaller chunks to load on demand. Flexible: Route level or Component level; On visibility or On user interaction.                                       | `<img loading="lazy">` (Only load when user scrolls near them, [already widely supported](https://caniuse.com/loading-lazy-attr)), [Component](../React/react-snippets.mdx#lazy-load--component-maps), Fonts, Scripts, Static Assets. |
| Image Optimization                     | [Responsive Image](./image.md), [CSS Sprites](https://spritegen.website-performance.org/)                                                                                     | -                                                                                                                                                                                                                                     |
| Debounce & Throttle                    | Limiting the number of times a function is executed, especially heavy ones                                                                                                    | - Debounce: Executed only after a certain period of time has passed since the last event <br /> - Throttle: Limits the execution rate of a function to a specified time interval                                                      |
| Analytics                              | Not always accurately reflects of true user experience. Sometimes the true experience when using the application is more reliable than the stats shown by any automated tool. | Google Lighthouse or Next.js built-in tools.                                                                                                                                                                                          |
| UX                                     | Finally, UX knowledge can be applied to enhance user experience without even boosting performance                                                                             | -                                                                                                                                                                                                                                     |
| Preload                                | Tell browser to fetch the resource ASAP, most likely to be used in the current page. Highest priority.                                                                        | - `<link rel="preload">` <br /> - `next/script` with `strategy` prop as `beforeInteractive` <br /> - `next/image` with `priority` prop as `true`                                                                                      |
| Prefetch                               | Utilizes browser idle time to fetch resources which the user might use in the near future. Lower priority compared to `preload`                                               | - `<link rel="prefetch">` <br /> - `next/link` with `prefetch` prop as `true` <br /> - `next/router` with `prefetch` method-                                                                                                          |
| List Virtualization                    | Only render the items that are visible to the user. **I personally dislike this because it break Ctrl+F** although it can be fixed with our own search box.                   | -                                                                                                                                                                                                                                     |
| Caching                                | By changing the `Cache-Control` header, you can control how long the browser caches a resource.                                                                               | -                                                                                                                                                                                                                                     |
| Metadata                               | For [SEO](./seo.md)                                                                                                                                                           | -                                                                                                                                                                                                                                     |

### React

- [Optimize hooks](../React/hooks.mdx#optimize)
- [Next.js Built-in](https://nextjs.org/docs/app/building-your-application/optimizing): Images, Fonts, Scripts, Static Assets, Lazy/ Dynamic Loading, Analytics
- React DevTools Profiler

## Core Web Vitals

**[Core Web Vitals](https://web.dev/learn-core-web-vitals/)** are a **subset** of **[Performance Metrics](https://web.dev/metrics/)**, defined by Google, aim to provide unified guidance for quality signals that are essential to delivering a <u>great user experience</u> on the web, while **Performance Metrics** evaluate <u>many different aspects</u> like server-side performance, resource optimization, and JavaScript execution time.

The metrics that make up **Core Web Vitals** will **evolve over time**. The current set for 2020 focuses on three aspects of the user experience—_loading (**LCP**)_, _interactivity (**FID**)_, and _visual stability (**CLS**)_. Read [how the Performance score is weighted](https://web.dev/performance-scoring).

| Metrics                                                                               |                 How to improve                  |
| ------------------------------------------------------------------------------------- | :---------------------------------------------: |
| [Time to First Byte (TTFB)](https://web.dev/ttfb/)                                    |     [Link](https://web.dev/optimize-ttfb/)      |
| [First Contentful Paint (FCP)](https://web.dev/fcp/)                                  | [Link](https://web.dev/fcp/#how-to-improve-fcp) |
| CWV: [Largest Contentful Paint (LCP)](https://web.dev/lcp/)                           |      [Link](https://web.dev/optimize-lcp/)      |
| CWV: [First Input Delay (FID)](https://web.dev/fid/) - will soon be replaced with INP |      [Link](https://web.dev/optimize-fid/)      |
| [Time to Interactive (TTI)](https://web.dev/tti/)                                     | [Link](https://web.dev/tti/#how-to-improve-tti) |
| [Total Blocking Time (TBT)](https://web.dev/tbt/)                                     | [Link](https://web.dev/tbt/#how-to-improve-tbt) |
| CWV: [Cumulative Layout Shift (CLS)](https://web.dev/cls/)                            |      [Link](https://web.dev/optimize-cls/)      |
| CWV: [Interaction to Next Paint (INP)](https://web.dev/inp/) - will soon replace FID  |      [Link](https://web.dev/optimize-inp/)      |

### [Largest Contentful Paint (LCP)](https://web.dev/lcp/)

**LCP** measures the **loading performance** of a web page. To be specific, it measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page.

Improve **LCP** by: Optimized image component or even before delivered, lazy loading. [Read more](https://web.dev/optimize-lcp/)

:::caution
This is not **First Contentful Paint (FCP)**, which measures the time from when the page begins to load to when the first element is rendered on screen.
:::

### [First Input Delay (FID)](https://web.dev/fid/) ~~ Total Blocking Time (TBT)

**FID** measures the **interactivity** of a web page. To be specific, it measures how much is the delay users experience between initiating an interaction (e.g. clicking a button) and the browser responding to that interaction.

Improve **FID** by: Reduce the amount of JavaScript executed on page load by using code splitting, removing unused code, and deferring non-critical JavaScript. [Read more](https://web.dev/optimize-fid/)

:::info
This will soon be replaced by [Interaction to Next Paint - INP](https://web.dev/inp/)
:::

### [Cumulative Layout Shift (CLS)](https://web.dev/cls/)

**CLS** measure your site’s **overall layout stability**. To be specific, it measures how much elements have been shifted after initially being rendered by the DOM. Ex: A `button` is rendered after the `text block`, causing the `text` to shift downward.

Improve **CLS** by: Skeleton & Placeholder. [Read more](https://web.dev/optimize-cls/)

## Clean code

- Separate logic and UI by using custom hooks (prefered) or [Container/ Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern).
- Things that change together should be located as close as possible but should still be still resonable.
- SOLID, DRY
- YAGNI (You Aren't Gonna Need It): Don't add code that you only think you **might** need in the future.
- KISS (Keep It Simple, Stupid): The simpler the code, the easier it is to understand and maintain. "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
- Meaningful Variable Names and Comments.
- Avoid premature optimization.
