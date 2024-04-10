---
title: 'Performance'
---

## Actions

### General (in order of familiarity)

- **Ship the smallest JS bundle possible**: Use right tools for the job e.g. _Astro_ and _RSC_ for static sites. Choose well-maintained, small, and tree-shakeable packages.
- **Lazy/ Dynamic Loading (Code Splitting)**: Split JS bundles into smaller chunks to load on demand.
  - Flexible: Route level or Component level; On visibility or On user interaction.
  - Example: `<img loading="lazy">` (Only load when user scrolls near them, [already widely supported](https://caniuse.com/loading-lazy-attr)), [React component with `lazy` and `Suspense`](../React/react-snippets.mdx#lazy-load-with-lazy--suspense), Fonts, Scripts, Static Assets.
- **Static Assets Optimization**: [Responsive Image](./image.md), [CSS Sprites](https://spritegen.website-performance.org/), compress and choose the right format for images and videos.
- **Debounce & Throttle**: Limiting the number of times a function is executed, especially heavy ones. Example: _Debounce_: Executed only after a certain period of time has passed since the last event. _Throttle_: Limits the execution rate of a function to a specified time interval.
- **Analytics**: Not always accurately reflect true user experience. Sometimes the true experience when using the application is more reliable than the stats shown by any automated tool. Example: Google Lighthouse, WebPageTest.org.
- **UX**: Finally, FE devs should have a decent level of UX because BRDs can't cover everything, especially minor UI behaviors, so a good FE developer can increase the user's perception of performance even without boosting it.
- **List Virtualization**: Only render the items that are visible to the user. **I personally dislike this because it break Ctrl+F** although it can be fixed with our own search box.
- **Caching**: By changing the `Cache-Control` header, you can control how long the browser caches a resource.
- **Metadata**: For [SEO](./seo.md).

### PRPL Pattern

- **Push (Pre-load)** critical resources (HTML CSS JS) as early as possible. Example: `<link rel="preload">`, `next/script` with `strategy` prop as `beforeInteractive`, `next/image` with `priority` prop as `true`.
- **Render** the web page as soon as the critical resources are received, even if some non-critical resources are still being downloaded e.g. [`script` with `defer` or `async` attribute](../General%20Web/html-elements.md#script-with-defer--async-attribute).
- **Pre-cache (Pre-fetch)** non-critical resources in the background so that they are available when needed. Example: `<link rel="prefetch">`, `next/link` with `prefetch` prop as `true`, `next/router` with `prefetch` method.
- **Lazy-load** non-critical resources until they are needed, such as when the user scrolls to them or interacts with them.

### React and Next.js

- [Optimize hooks](../React/hooks.mdx#optimize)
- [Next.js Built-in](https://nextjs.org/docs/app/building-your-application/optimizing): Images, Fonts, Scripts, Static Assets, Lazy/ Dynamic Loading, Analytics
- React DevTools Profiler

## Clean code

- Avoid premature optimization.
- Meaningful Variable Names and Comments.
  - Name `Boolean`s with an **[affirmative phrase](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/names-of-type-members?redirectedfrom=MSDN)** (`CanSeek` instead of `CantSeek`).
  - `Boolean` should be prefixed with `is`, `has`, `should`, `can` ([Code Complete](https://en.wikipedia.org/wiki/Code_Complete)); `are`, `was`, `will`, `did`, `must`,... e.g. `isFetching`, `hasError`, `shouldShow`, `canSubmit`, `areEqual`, `wasClicked`, `willLoad`, `didMount`, `mustUpdate`.
- Separate logic and UI by using custom hooks (preferred) or [Container/ Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern).
- Things that change together should be located as close as possible but should still be reasonable.
- SOLID, DRY
- YAGNI (You Aren't Gonna Need It): Don't add code that you only think you **might** need in the future.
- KISS (Keep It Simple, Stupid): The simpler the code, the easier it is to understand and maintain. "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."

## Targets

### RAIL Model

- **Response**: Respond to user input in under 100ms and they will feel like the result is immediate. If longer always provide feedback e.g. loading spinner.
- **Animation**: Keep animations smooth (60fps = 16ms per frame = 10ms per frame + time for browser to paint)
- **Idle**: Take advantage of idle time to perform non-critical tasks.
- **Load**: The time it takes to execute a task _e.g. loading pages or changing views_ should be under 1 second.

### Core Web Vitals

_[Core Web Vitals](https://web.dev/learn-core-web-vitals/)_ are a **subset** of _[Performance Metrics](https://web.dev/metrics/)_ defined by Google. They are essential to delivering a great user experience on the web, while **Performance Metrics** evaluate <u>many different aspects</u> like server-side performance, resource optimization, and JavaScript execution time.

The metrics that make up **Core Web Vitals** will **evolve over time**. Read [how the Performance score is weighted](https://web.dev/performance-scoring). Typically, they focus on three aspects: Loading (LCP), Interactivity (FID -> INP), Visual stability (CLS)

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

**LCP** measures the **loading performance**. It measures the time it takes to get the largest element on the page visible within the viewport. This could be a large text block, video, or image that takes up the primary real estate on the page.

Improve **LCP** by: [Optimized images](./image.md), Prioritizing critical resources, Caching. [Read more](https://web.dev/optimize-lcp/)

:::caution
This is not **First Contentful Paint (FCP)**, which measures the time from when the page begins to load to when the first element is rendered on screen.
:::

### [First Input Delay (FID)](https://web.dev/fid/) ~~ Total Blocking Time (TBT)

**FID** measures the **interactivity**. It measures how much is the delay users experience between initiating an interaction (e.g. clicking a button) and the browser responding to that interaction.

Improve **FID** by: Reduce the amount of JavaScript executed on page load by using code splitting, removing unused code, Prioritizing critical resources. [Read more](https://web.dev/optimize-fid/)

### [Interaction to Next Paint (INP)](https://web.dev/inp/)

**INP** measures the **interactivity**. It observes the latency of all interactions a user has made with the page and reports a single value which all (or nearly all) interactions were below. A low INP is **better** as the page was consistently able to respond quickly to all—or the vast majority—of user interactions.

### [Cumulative Layout Shift (CLS)](https://web.dev/cls/)

**CLS** measure **overall layout stability**. It measures how much elements have been shifted after initially being rendered by the DOM. Ex: A `button` is rendered after the `text block`, causing the `text` to shift downward.

Improve **CLS** by: Skeleton & Placeholder. [Read more](https://web.dev/optimize-cls/)
