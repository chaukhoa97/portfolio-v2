---
title: 'JavaScript Snippets'
category: 'JavaScript'
draft: false
---

- Dynamic object key

  ```jsx
  const { name, id } = event.target;
  setSearchParams({ [name]: id });
  ```

- Scroll to top
  ```jsx
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  ```
