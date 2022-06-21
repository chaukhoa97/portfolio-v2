---
title: 'SEO'
---

**The most important thing for SEO is that page data and metadata is available on page load without JavaScript. In this case SSG or SSR are going to be your best options.**

![](https://nextjs.org/_next/image?url=%2Fstatic%2Fimages%2Flearn%2Fseo%2Fgooglebot.png&w=1920&q=75)

1. **Find URLs**: Google sources URLs from many places, including Google Search Console, links between websites, or XML sitemaps.
2. **Add to Crawl Queue**: These URLs are added to the Crawl Queue for the Googlebot to process. URLs in the Crawl Queue usually last seconds there, but it can be up to a few days depending on the case, especially if the pages need to be rendered, indexed, or – if the URL is already indexed – refreshed. The pages will then enter the **Render Queue**.
3. **HTTP Request**: The crawler makes an HTTP request to get the headers and acts according to the returned status code:

   - 200 - it crawls and parses the HTML.
   - 30X - it follows the redirects.
   - 40X - it will note the error and not load the HTML
   - 50X - it may come back later to check if the status code has changed.

4. **Render Queue**: The different services and components of the search system process the HTML and parse the content. If the page has some JavaScript client-side based content, the URLs might be added to a Render Queue. Render Queue is more costly for Google as it needs to use more resources to render JavaScript and therefore URLs rendered are a smaller percentage over the total pages out there on the internet. Some other search engines might not have the same rendering capacity as Google, and this is where Next.js can help with your rendering strategy.
5. **Ready to be indexed**: If all criteria are met, the pages may be eligible to be indexed and shown in search results.
