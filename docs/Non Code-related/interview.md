---
title: 'Interview'
---

## React

### Features

- **What is React?**: React is an open-source front-end JavaScript library that is used for building user interfaces, especially for single-page applications.
- **JSX syntax**: Provide us JS functionalities along with HTML like template syntax.
- **Reusable components**
- Support **Server-side rendering**

### Virtual DOM vs Real DOM

- **Virtual DOM**: Là 1 bản sao in-memory của Real DOM. When there are [re-renders](../React/lifecycle.md#step-1-react-trigger-render-initial-hoặc-re-render-component), React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output, which means React only changes the DOM nodes if there’s a difference between renders.
- **So sánh VDOM vs Real DOM**: Real DOM chậm hơn vì mỗi khi DOM thay đổi, trình duyệt cần phải dựng lại UI ở ngoài browser, so với những thay đổi chỉ xảy ra ở trong memory của VDOM.

### Docs

All docs

## TypeScript

### Features

- _Optional_ static typing.
- IDEs provide Intellisense for TS, show warnings and errors about any potenial issues in your code even before _Compile time_.
- Also help when using libs or frameworks, as we can know the type of the API data.

### Docs

- All docs
- Folder TS Archive

## JavaScript

### Docs

- [Basis](../JavaScript/basis.md)
- Folder JS Archive

## Next.js

### Features

- React Framework for Production.
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
