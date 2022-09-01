---
title: 'Interview'
---

## Prerequisite

Introduction and functionalities &rarr; Fundamental concepts and features.

## React

### Introduction

A declarative, efficient, and flexible JavaScript library for building user interfaces.

#### Features

- **JSX**: HTML-based template syntax coming with JS functionalities.
- Easy to reuse components.
- Support **Server-side rendering**.

### Docs

Đọc kỹ hết.

## TypeScript

### Introduction

A strongly typed programming language that builds on JavaScript.

#### Features

- _Optional_ static typing.
- I prefer looking at Typescript type system as a programming language itself, for example a `Type` with `Generic` is like a function with parameter; or [Mapped Types](../JavaScript/TypeScript/features#mapped-types) is like a loop.
- IDEs provide Intellisense for TS, show warnings and errors about any potenial issues in your code even before _Compile time_.

### Docs

- Đọc kỹ [Features](../JavaScript/TypeScript/features)
- Folder TS Archive

## JavaScript

### Docs

- Đọc kỹ hết.
- [Array and Object methods](../JavaScript/array-object-methods.mdx)

## Next.js

### Introduction

React Framework for Production.

#### Features

- Built-in Server-side Rendering Support. We can even blend CSR with SSR.
- File-based Routing.
- Have Fullstack Capabilities: We can add backend (server side) code into our Next.js app.

### Docs

Đọc kỹ hết

## Virtual DOM

An in-memory copy of the Real DOM. React, Vue, Angular ship JS code to the browser to make ur code work at the runtime.

### React

When there are [re-renders](../React/react-lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component), while rendering, React will compute the diffs between what's _currently on the page_ vs what _should be on the page_, calculate the minimal necessary DOM operations to make the DOM match the latest rendering output, and then batch executes all updates.

It also decouples rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. rendering to a string (**SSR**), native mobile rendering (**React Native**).

### Cons

Using Virtual DOM is NOT faster bc it's actually an **addition** of the final operations on the real DOM (_diffing_ is NOT free). It is only faster if we compare it in a more complex context when the DOM doesn't have a way to optimize updates (e.g. batch updates, or list updates) because it can reduce the number of DOM operations.  
Even though new frameworks nowadays have their way to achieve that without using Virtual DOM, in real-world applications, the Virtual Dom is usually fast enough. After a certain point, performance is no longer the main selling point of a library or framework, especially when the difference is only in microseconds.

### Compiler

New frameworks today have their own **compiler** that knows at build time how things could change in your app, rather than waiting to do the work at run time (it tries to do as much of the work in the build time).  
It compiles your _declarative_ code into _efficient imperative_ code that works with **native browser APIs**, so the Virtual Dom can do less work &rarr; High performance and small package.

### Vue

Vue still uses Virtual Dom partially but Evan You want to take the _template_ and compile it to something that's **NOT** Virtual Dom at all, similar to **SolidJS** or **Svelte**: Directly create a piece of HTML DOM, and generate code that _binds individual nodes to reactive expressions_ instead of walking the whole DOM to figure out which node should each reactive expression bind to.

## HTML CSS

### Docs

- [CSS](../CSS/css-essentials)
- [HTML `<head>`](../Extras/Archive/html-head)

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
