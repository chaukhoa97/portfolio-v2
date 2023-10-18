---
title: 'Common Sections'
sidebar_position: 1
---

## `Link` & `useRouter`

The default navigation behavior (via `Link` or `useRouter`) of the Next.js App Router is to **scroll to the top of a new route** or to **maintain the scroll position for backwards and forwards navigation**.

Read more: <https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#disabling-scroll-restoration>

### `<Link>` vs `router.push`

Cả 2 đều là _Client-side route transitions_, tuy nhiên `router.push` không tạo ra `<a>` tag &rarr; **Your links won't be detected by crawlers**.

## Prefetching

- `<Link>` component: Routes are automatically prefetched as they become visible in the user's viewport. Prefetching happens when the page first loads or when it comes into view through scrolling.
- `router.prefetch()`: Prefetch routes programmatically.
