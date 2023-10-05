---
title: 'HTML Elements'
---

## `script` with `defer` & `async`

![script differences](https://www.josefzacek.cz/wp-content/uploads/2018/03/whats-the-difference-between-async-vs-defer-attributes.jpg)

### Plain `<script>`

For normal `<script>` tags without any `async` or `defer`, when they are encountered, HTML parsing is blocked, the script is fetched and executed immediately. HTML parsing resumes after the script is executed.

### `<script async>`

In `<script async>`, the script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes) and it will <u>not necessarily be executed in the order in which it appears in the HTML document</u>. Use `async` when the script is <u>not critical to the initial rendering and doesn't depend/ is depended on other scripts, e.g. analytics.</u>

### `<script defer>`

In `<script defer>`, the script will be fetched in parallel to HTML parsing and executed when the document has been fully parsed, but before firing `DOMContentLoaded`. <u>If there are multiple of them, each deferred script is executed in the order they appeared in the HTML document.</u>

Use `defer` when the script <u>relies on a fully-parsed DOM</u>, as it can ensure that the HTML is fully parsed before executing. Or when the script <u>depends/ is depended on other scripts</u>, as the order of execution is guaranteed.

## `<head>`

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

### `meta robots`

- `noindex`: To not show this page in search results. Omitting `noindex` will indicate the page can be indexed and shown in search results. In a website, u might not want to index certain pages. Common use cases include settings pages, internal search pages, policies, and more.

- `nofollow`: To not follow links on this page. Omitting this will allow robots to crawl and follow links on this page. Links found on other pages may enable crawling, so if link `A` appears in pages `X` and `Y`, and `X` has a nofollow robots tag, but `Y` doesn't, Google may decide to crawl the link.

### `meta googlebot`

Use this tag if you want to have a separate rule for Googlebot, and a general one for the rest of the search bots.

### `canonical`

Content của `example.com/products/phone` trùng với `example.com/phone` &rarr; Chọn link này để Google ko crawl trùng.

### Semantic

`section(A group of content, typically with a heading)`, `header, nav, main, footer, aside`, article, address, figure.
