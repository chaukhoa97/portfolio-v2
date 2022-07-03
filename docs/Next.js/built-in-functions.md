---
title: 'Built-in Functions'
---

### `getStaticProps` + `getStaticPaths`

These 2 functions only runs at build time on server-side.

#### `getStaticProps`

If you export a function called `getStaticProps` (Static Site Generation) from a page, **Next.js will pre-render this page at build time using the props returned by `getStaticProps`**.

#### `getStaticPaths`

If a page has [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes) and uses `getStaticProps`, it needs to define a list of paths to be statically generated.

When you export a function called `getStaticPaths` (Static Site Generation) from a page that uses dynamic routes, **Next.js will statically pre-render all the paths specified by `getStaticPaths`**.

```jsx title='pages/[id].jsx'
// [id].jsx -> các obj trong `paths[]` phải có dạng { params: { id: '1' } }
export const getStaticPaths = async () => {
  // Fetch or do something...
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }]
  return { paths, fallback: false }
}

// `context` là object có nhiều property (đọc API của `getStaticProps`)
// Trong đó quan trọng nhất là `params` - Route params for pages using Dynamic routes.
// [id].jsx -> context = { params: { id: ... }, locales... }
export const getStaticProps = async (context) => {
  const { params: { id } } = context
  const title = `Bài viết số ${id}`

  // `paths` ở đây ko dùng để lựa các page để pre-render như `getStaticPaths`, mà chỉ để render các Link trong NavBar 
  const paths = [{ params: { id: '3' } }, { params: { id: '4' } }]

    if (!title) {
    return {
      notFound: true,
      // hoặc
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      // `id`, `title`, `paths` will be passed to the Page component as props
      id,
      title,
      paths,
    },
    revalidate: 60, 
  }
}

export default function Page({ id, title, paths }) {
  return (
    <div className="flex">
      <div className="w-1/4">
        {paths.map((path) => (
          <Link href={path.params.id} key={path.params.id}>
            <a className="beautiful-link">{path.params.id}</a>
          </Link>
        ))}
      </div>
      <div className="w-3/4">
        {id}, {title}
      </div>
    </div>
  )
}
```

### `getServerSideProps`

Run on every request. Syntax giống hệt `getStaticProps`  

If you export a function called `getServerSideProps` (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`.
