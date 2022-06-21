---
title: 'Data Fetching Functions'
---

### `getStaticProps` + `getStaticPaths`: Only runs at build time on server-side

```jsx
// [pageId].jsx -> các obj trong `paths[]` phải có dạng { pageId: ... }
export const getStaticPaths = async () => {
  // Fetch or do something...
  const paths = [{ params: { pageId: 't1' } }, { params: { pageId: 't2' } }];
  return { paths, fallback: false };
};

// `context` là object có nhiều property (đọc docs), trong đó quan trọng nhất là
// `params` - chính là Route Parameters for pages using dynamic routes.
// [pageId].jsx -> context = { params: { pageId: ... }, locales... }
export const getStaticProps = async (context) => {
  const {
    params: { pageId }, //! Nested Destructuring
  } = context;
  const title = `Bài viết số ${pageId}`;

  // Fetch or do something..., `paths` dùng để render các Link trong navBar
  const paths = [{ params: { pageId: 't1' } }, { params: { pageId: 't2' } }];

  return {
    props: {
      // `pageId`, `title`, `paths` will be passed to the Page component as props
      pageId,
      title,
      paths,
    },
  };
};

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
  );
}
```

### `getServerSideProps`: Run on every request. Syntax giống hệt `getStaticProps`
