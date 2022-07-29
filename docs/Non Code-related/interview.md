---
title: 'Interview'
---

## Prerequisite

Introduction and functionalities &rarr; Fundamental concepts and features.

## React

### Introduction

An open-source front-end JavaScript library that is used for building user interfaces, especially for SPA.

#### Features

- **JSX syntax**: Provide us JS functionalities along with HTML like template syntax.
- **Reusable components**
- Support **Server-side rendering**

### Virtual DOM vs Real DOM

- **Virtual DOM**: Là 1 bản sao in-memory của Real DOM. When there are [re-renders](../React/lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component), React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output, which means React only changes the DOM nodes if there’s a difference between renders.
- **So sánh VDOM vs Real DOM**: Real DOM chậm hơn vì mỗi khi DOM thay đổi, trình duyệt cần phải dựng lại UI ở ngoài browser, so với những thay đổi chỉ xảy ra ở trong memory của VDOM.

### Docs

All docs

## TypeScript

### Introduction

A strongly typed programming language that builds on JavaScript.

#### Features

- _Optional_ static typing.
- IDEs provide Intellisense for TS, show warnings and errors about any potenial issues in your code even before _Compile time_.
- Also help when using libs or frameworks, as we can know the type of the API data.

### Docs

- All docs
- Folder TS Archive

## JavaScript

### Docs

- All docs
- [Array and Object methods](../Snippets/array-object-methods.mdx)

## Next.js

### Introduction

React Framework for Production.

#### Features

- Built-in Server-side Rendering Support. We can even blend CSR with SSR.
- File-based Routing.
- Have Fullstack Capabilities: We can add backend (server side) code into our Next.js app.

### Pre-rendering

By default, Next.js pre-renders every page. Nghĩa là Next.js sẽ tạo trước HTML, thay vì để JS ở client-side làm hết.  
Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called `hydration`).

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)
![No Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

### Docs

All docs

## HTML CSS

### Docs

- [CSS](../CSS/basis.md)
- [HTML `<head>`](../Non%20Code-related/html-head.md)

## Other

### Libs & Frameworks

- **Storybook**: Tool for building UI components and pages in isolation. It enhances UI development, testing, and documentation.
- **Tanstack Query**: Asynchronous state management. It gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both DX and UX.
- **Node.js**: A JS runtime environment that allow JS to run on the server in addition to running in the browser.
- **Express**: A Node.js web application framework that provides a robust set of features for building SPA.
- **Babel**: A JS transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JS that can be run by older browsers.

### Headless CMS vs Traditional CMS

- **Traditional CMS**: Content &rarr; Content Delivery Template &rarr; Web pages
- **Headless CMS** (Sanity/Strapi): Content &rarr; Raw JSON Data &rarr; Any plaform (TV, Smart watch, mobile, etc.)

### Declarative vs Imperative

- **Imperative**: Tell machine how to get what I want.
- **Declarative**: Tell machine what I want.
