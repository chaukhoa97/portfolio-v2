---
title: 'Interview'
---

## Prerequisite

Introduction and functionalities &rarr; Fundamental concepts and features.

### React

A declarative, efficient, and flexible JavaScript library for building user interfaces.

#### Features

- **JSX**: HTML-based template syntax coming with JS functionalities.
- Component-based: The components manage their own state and can be reused anywhere to make more complex UIs.
- Support **Server-side rendering**. Although we barely do it with vanilla React, there are many frameworks like Next.js and Remix that do this for us.
- [Virutal DOM](../React/react-essentials.md#virtual-dom). But I don't think it should be called a feature any more.

### TypeScript

A strongly typed programming language that builds on JavaScript.

#### Features

- Static typing and can be **Optional**. You don't even need to really code in TypeScript but you can still benefit from TypeScript infer system.
- TS is well-supported by many IDEs. They show warnings and errors about any potenial issues in your code even before _Run time_.
- You can even look at Typescript type system as a programming language itself. It has Conditional Type; or a `Type` with `Generic` is like a function with parameter; or Mapped Types is like a loop.

### Next.js

React Framework for Production.

#### Features

Have many built-in features for a great production app.

- Server-side Rendering support. We can even allowed to choose between CSR and SSR on every page in our app.
- File-based Routing. Vercel is also working on a new Layout system to make it even more flexible.
- Optimized image component. This is huge because images are the biggest performance bottleneck in most websites.
- Have Fullstack Capabilities: We can add backend (server side) code into our Next.js app.

## Others

### Libs/Frameworks

- **Storybook**: Tool for building UI components and pages in isolation. It enhances UI development, testing, and documentation.
- **Tanstack Query**: Asynchronous state management. It gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both DX and UX.

### Tools

- **Docker**: A plaform used to deliver software in packages called _contianers_.
- **Webpack**: A module bundler for modern JavaScript applications &rarr; Vite.
- **Babel**: A JS transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JS that can be run by older browsers.

### Back-end

- **REST(ful) API**: API that follows a set of rules called _REST_, that both request and response are in a specific format (headers, body):

  - Have a set of methods (GET, POST) when doing request from client to server.
  - Have a set of status codes (200, 404(Client), 500(Server)) in the response message header to tell client what happened to their request.
    ![REST API](https://i.imgur.com/aBGmnEz.png)

- **Node.js**: A JS runtime environment that allow JS to run on the server in addition to running in the browser.
- **Express**: A Node.js web application framework that provides a robust set of features for building SPA.

### Headless CMS vs Traditional CMS

- **Traditional CMS**: Content &rarr; Content Delivery Template &rarr; Web pages
- **Headless CMS** (Sanity/Strapi): Content &rarr; Raw JSON Data &rarr; Any plaform (TV, Smart watch, mobile, etc.)

### Declarative vs Imperative progamming

- **Imperative**: Tell machine how to get what I want.
- **Declarative**: Tell machine what I want.

### [Local Storage vs Session Storage vs Cookies](https://i.stack.imgur.com/6EL55.png)

#### Local Storage

- 5MB/10MB.
- The data is not sent back to the server.
- The data persists until explicitly deleted by JS or Clear Browsing Data of browser.
- Changes made are saved and available for all current and future visits to the site.
- Usage: Non-sensitive data (e.g. user settings, scores)

#### Session Storage

- 5MB.
- The data is not sent back to the server.
- The data is deleted when the user closes the tab (survive _reload_ btw).
- Changes made are only available per tab.
- Usage: Session data (e.g. cart when not logged in)

#### Cookies

- 4KB.
- The data is sent back to the server on every HTTP request.
- Have expiry date.
- Mostly read by server (can also be read by client).
- HTML 4 Support.
- Usage: Store identifying tokens for authentication, and advertising tracking.