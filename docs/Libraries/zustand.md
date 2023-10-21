---
title: 'Zustand'
---

## [Basic](https://docs.pmnd.rs/zustand/getting-started/introduction#first-create-a-store)

```jsx
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  fetch: async (jungle) => {
    const response = await fetch(jungle)
    set({ bears: await response.json() })
  },
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const { increasePopulation, removeAllBears } = useStore() // can also use destructuring
  return (
    <div>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>
    </div>
  )
}
```

[![Edit zustand basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zustand-basic-srv6zq?fontsize=14&hidenavigation=1&theme=dark&view=editor)

## [Overwriting state](https://github.com/pmndrs/zustand#overwriting-state)

The `set` function has a second argument, `false` by default. Instead of merging, it will replace the state model.

```jsx
import omit from 'lodash-es/omit'

const useFishStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // clears the entire store, actions included
  deleteTuna: () => set((state) => omit(state, ['tuna']), true),
}))
```

## [Fetching Everything](https://github.com/pmndrs/zustand#fetching-everything)

You can, but bear in mind that it will cause the component to update on every state change!

```js
const state = useBearStore()
```
