---
title: 'Redux'
---

## Terminology

- Store: Hold the Redux app `state`
- Reducer: A fn that receives the current `state` and an `action` obj to calculate the new `state`: `(state, action) => newState`. There can be many reducers in an app by passing them in `configureStore({ reducer: {reducer1, reducer2, ...} })`.
- Action: JS obj that has a `type` property and an optional `payload` property. You can think of an action as an event that describes something that happened in the application -> _Action Creator_: A fn that creates and returns an action object.
- Dispatch: The Store has a method called `dispatch`, it's the only way to update the state via `store.dispatch(action obj)`. You can think of dispatching actions as "triggering an event" in the application.
- Selector: A fn that extract specific parts of the Redux state `const countPlusTwo = useSelector(state => state.counter.value + 2)`
- Slice: A collection of Redux reducer logic and actions for a single feature of your app. `createSlice` takes care of the work of generating the action type string, action creator functions, and action objects, and allows us to mutate the state directly via `Immer`. It requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated.
- Thunk: A middleware that allows you to write action creators that return a function instead of an action obj. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.

```js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment(state, action) {
      return state + action.payload
    },
    decrement: (state) => state - 1,
  },
})
```

```js
// Redux Thunk dc tự động thêm vào khi dùng configureStore. Khi Redux Thunk dc enable, whenever u dispatch 1 fn instead of an obj, middleware will call that fn  with `dispatch` and `getState` as the 1st and 2nd argument
export const asyncChange = (champ) => {
  // Redux automatically assign `dispatch` to the argument `dp`
  return async exampleThunkFunction(dp, getState) => {
    getState() // {"name": "Caitlyn", "skin": "bac cuc"}
    dp(champActions.changeName({ name: champ.name }))
    getState() // {"name": "Jhin", "skin": "bac cuc"}
    await fetch('https://react-http-6b4a6.firebaseio.com/cart.json')
    dp(champActions.changeSkin(champ.skin))
    getState() // {"name": "Jhin", "skin": "hac tinh"}
  }
}
...
dispatch(asyncChange({ name: 'Jhin', skin: 'hac tinh' }))
```

```js

```

## Steps

![One-way data flow](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

1. The **Store** provides all application states for the components to display on the UI (<u>Single source of truth</u>).
2. User tương tác lên UI, e.g. click button.
3. Component call `dispatch(Action obj)` hoặc `dispatch(Thunk)` - with `Thunk` is an async fn that also returns an `Action obj`.  
   An `Action obj` typically has the following format: `{ type: "SHOW_NOTIFICATION", text:... }`:

   - Property `type` to tell the store which reducer should be called.
   - `payload` (`payload.text`, `payload.value`...) as the arguments for the reducer.

4. Redux store dựa theo `type` của `Action obj` để gọi `reducerFn` tương ứng và Update Store data dựa theo `storeState` & `payload`.

## Redux vs React Context

### Context

NOT a stage management. This is because it’s a form of _dependency injection_, or a _transport_ mechanism. You can put whatever value you want in Context and manage it yourself, typically via `useState` or `useReducer` (Moderately complex React component state management using a reducer function).

Use context if you have **some** states or functions that **don't** change often and need to be accessed through part of the app, and you don't want to pass them as props all the way down. It **doesn't** include any mechanism for side effects - it's purely for rendering components.

Context + `useReducer` relies on passing the **current state value** via `Context`. This means when `useReducer` produces a new state value, all components that are subscribed to that context will be forced to re-render, even if they only care about **part** of the data.

### Redux

A very generic state management tool that can be used for a broad use cases: Caching state from a server, UI state, and other complex data management on the client. It might not be quite the best at all of them, but you can do lots of different things.

Use (React-)Redux if you have **many** states or functions with **complex logic** that **do** change often. It is also useful for medium or large-sized apps, or when you want to be able to understand when, where, why, and how the state in your application has updated, and visualize the changes to your state over time. It **uses middleware** to allow app code to trigger side effects.

React-Redux passes the **current Redux store instance** via Context. Components can subscribe to **specific** pieces of the store state, and only re-render when those values change.
