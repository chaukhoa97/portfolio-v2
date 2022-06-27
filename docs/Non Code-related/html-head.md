---
title: 'HTML <head>'
---

```html
<!DOCTYPE html>: HTML5, HTML cũ hơn thì dài hơn rất nhiều
<html lang="en" dir="rtl">
  <head>
  Set character encoding for the document
    <meta charset="UTF-8" />
  Viewport for responsive web design
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  Allows control over where resources are loaded from. Place as early as possible,
  as the tag only applies to resources that are declared after it.
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  Control the behavior of search engine crawling and indexing
    <meta name="robots" content="noindex,nofollow">
    <meta name="googlebot" content="index,follow">
  -------------------------------------------
    <meta name="google" content="nositelinkssearchbox">
    <meta name="google" content="notranslate">
    <link rel="canonical" href="https://example.com/products/phone" />
  Name of web application (only should be used if the website is used as an app)
    <meta name="application-name" content="Application Name" />
    <link> ... Links to external CSS & JS files </script>
  </head>
</html>
```

- `<meta robots />`(line **16**)

  - `noindex`: To not show this page in search results. Omitting `noindex` will indicate the page can be indexed and shown in search results.
    In a website, u might not want to index certain pages. Common use cases include settings pages, internal search pages, policies, and more.

  - `nofollow`: To not follow links on this page. Omitting this will allow robots to crawl and follow links on this page. Links found on other pages may enable crawling, so if link `A` appears in pages `X` and `Y`, and `X` has a nofollow robots tag, but `Y` doesn't, Google may decide to crawl the link.

- `meta googlebot`(line **17**): Use this tag if you want to have a separate rule for Googlebot, and a general one for the rest of the search bots.

- `canonical`(line **21**): Content của `example.com/products/phone` trùng với `example.com/phone` -> Chọn link này để Google ko crawl trùng

- Semantic: `section(A group of content, typically with a heading)`, `header, nav, main, footer, aside`, article, address, figure.
