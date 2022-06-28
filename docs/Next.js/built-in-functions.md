---
title: 'Built-in Functions'
---

### `getStaticProps` + `getStaticPaths`

These 2 only runs at build time on server-side.

#### `getStaticProps`

If you export a function called `getStaticProps` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

#### `getStaticPaths`

If a page has [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) and uses `getStaticProps`, it needs to define a list of paths to be statically generated.

When you export a function called `getStaticPaths` (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by `getStaticPaths`.

```jsx
// [pageId].jsx &rarr; các obj trong `paths[]` phải có dạng { pageId: ... }
export const getStaticPaths = async () => {
  // Fetch or do something...
  const paths = [{ params: { pageId: 't1' } }, { params: { pageId: 't2' } }]
  return { paths, fallback: false }
}

// `context` là object có nhiều property (đọc docs), trong đó quan trọng nhất là
// `params` - chính là Route Parameters for pages using dynamic routes.
// [pageId].jsx &rarr; context = { params: { pageId: ... }, locales... }
export const getStaticProps = async (context) => {
  const {
    params: { pageId }, //! Nested Destructuring
  } = context
  const title = `Bài viết số ${pageId}`

  // Fetch or do something..., `paths` dùng để render các Link trong navBar
  const paths = [{ params: { pageId: 't1' } }, { params: { pageId: 't2' } }]

  return {
    props: {
      // `pageId`, `title`, `paths` will be passed to the Page component as props
      pageId,
      title,
      paths,
    },
  }
}

export default function Page({ pageId, title, paths }) {
  return (
    <div className="flex">
      <div className="w-1/4">
        {paths.map((path) => (
          <Link href={path.params.pageId} key={path.params.pageId}>
            <a className="block">{path.params.pageId}</a>
          </Link>
        ))}
      </div>
      <div className="w-3/4">
        {pageId}, {title}
      </div>
    </div>
  )
}
```

### `getServerSideProps`: Run on every request. Syntax giống hệt `getStaticProps`
