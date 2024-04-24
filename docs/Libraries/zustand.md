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
  fetchBears: async (jungle) => {
    const response = await fetch(jungle)
    set({ bears: await response.json() })
  },
}))

function BearCounter() {
  // ❌ This will cause the component to update on every state change!
  const { bears } = useStore()

  // ✅ Correct way is to use selectors
  const bears = useStore((state) => state.bears)

  // ✅ And if we want to compute something, continue from a selector
  const doubleBears = useStore((state) => state.bears * 2)

  return (
    <h1>
      {bears} here..., {doubleBears} there...
    </h1>
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
