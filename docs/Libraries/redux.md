---
title: 'Redux'
---

## Redux vs React Context

### Context

NOT a stage management. This is because it’s a form of _dependency injection_, or a _transport_ mechanism. You can put whatever value you want in Context and manage it yourself, typically via `useState` or `useReducer` (Moderately complex React component state management using a reducer function).

Use context if you have **some** states or functions that **don't** change often and need to be accessed through part of the app, and you don't want to pass them as props all the way down. It **doesn't** include any mechanism for side effects - it's purely for rendering components.

Context + `useReducer` relies on passing the **current state value** via `Context`. This means when `useReducer` produces a new state value, all components that are subscribed to that context will be forced to re-render, even if they only care about **part** of the data.

### Redux

A very generic state management tool that can be used for a broad use cases: Caching state from a server, UI state, and other complex data management on the client. It might not be quite the best at all of them, but you can do lots of different things.

Use (React-)Redux if you have **many** states or functions with **complex logic** that **do** change often. It is also useful for medium or large-sized apps, or when you want to be able to understand when, where, why, and how the state in your application has updated, and visualize the changes to your state over time. It **uses middleware** to allow app code to trigger side effects.

React-Redux passes the **current Redux store instance** via Context. Components can subscribe to **specific** pieces of the store state, and only re-render when those values change.

## Steps

![One-way data flow](https://i.imgur.com/0yQz4vc.png)

1. The **Store** provides all application states for the components to display on the UI (<u>Single source of truth</u>).
2. User tương tác lên UI, e.g. click button.
3. Component call `dispatch(Action obj)` hoặc `dispatch(Thunk)` - with `Thunk` is an async fn that also returns an `Action obj`.  
   An `Action obj` typically has the following format: `{ type: "SHOW_NOTIFICATION", text:... }`:

   - Property `type` to tell the store which reducer should be called.
   - `payload` (`payload.text`, `payload.value`...) as the arguments for the reducer.

4. Redux store dựa theo `type` của `Action obj` để gọi `reducerFn` tương ứng và Update Store data dựa theo `storeState` & `payload`.
