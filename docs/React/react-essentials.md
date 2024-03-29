---
title: 'React Essentials'
sidebar_position: 1
---

## Key

Basically, keys in React are used to specify the position of the elements within their parent. It helps React infer what exactly happened and make the correct updates to the DOM.  
Keys are NOT globally unique. They only need to be unique among their siblings. The most common use case of `key` is in a list of items. But it can also be useful in some case when you need to tell React not to preserve the state of a component (i.e. **reset its state to the default**) when the DOM tree structure match up with the previous one.

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. `index`: In fact, that’s what React will use if you don’t specify a `key` at all. If the list order changes when an item is inserted, delete or if the array is sorted, it will leads to confusing bugs.

## Virtual DOM

An in-memory copy of the Real DOM.

### How it works in React

When there are [re-renders](./react-lifecycle.mdx#step-1-render-phase), while rendering ([1st phase](./react-lifecycle.mdx#step-1-render-phase)), React will compute the diffs between what's _currently on the page_ vs what _should be on the page_, calculate the minimal necessary DOM operations to make the DOM match the latest rendering output, and finally batch executes all updates in the _commit phase_.

### Cons

Using Virtual DOM is NOT faster because it's actually an **addition** to the final operations on the real DOM (_diffing_ is NOT free). It is only faster because it can reduce the number of DOM operations if we do the comparison in a more complex context when the real DOM doesn't have a way to optimize updates (e.g. batch updates, or list updates).

### Why React still uses Virtual DOM

Although more recent frameworks have their way to reduce DOM operations without using Virtual DOM, in real-world applications, the Virtual Dom is usually fast enough. It's not easy to change a fundamental part of a complex library like React and after a certain point, performance is no longer the main selling point of a library or framework, especially when the difference is only in microseconds.

Using Virtual DOM also opens up possibilities to decouple rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. native mobile rendering in **React Native**, rendering to a string (**SSR**).

### Recent frameworks compiler

React, Vue, Angular ship JS code to the browser to make ur code work at the **runtime**. More recent frameworks have their own **compiler** that knows at **Build time** how things could change in your app, rather than waiting to do the work at **Runtime**.  
It compiles your _declarative_ code into _efficient imperative_ code that works with **native browser APIs**, so the Virtual Dom can do less work &rarr; High performance and small package.  
React 19 will has its own compiler so we don't need to use `useCallback`, `useMemo`, `forwardRef`... anymore

### Virtual DOM in Vue

Vue still uses Virtual Dom partially but Evan You want to take the _template_ and compile it to something that's **NOT** Virtual Dom at all, similar to **SolidJS** or **Svelte**: Directly create a piece of HTML DOM, and generate code that _binds individual nodes to reactive expressions_ instead of walking the whole DOM to figure out which node should each reactive expression bind to.

## Data Flow

### Passing State down

```jsx
const Parent = () => {
  const parentData = 'random data'
  return <Children childProp1={parentData} />
}
```

### Lifting State up

If we want to sync components, we can declare states in their closest common ancestor and pass down the _event handler_ to coordinate the children components.

Here in `Accordion` we use the `activeId` state and pass down `handleShow` event handler so it can coordinate the `Panel` components.

```jsx
export default function Accordion() {
  const [activeId, setActiveId] = useState(0)
  const handleShow = (id) => setActiveId(id)

  return (
    <>
      <Panel onShow={handleShow} title="About" isActive={activeId === 0}>
        Bla bla
      </Panel>
      <Panel onShow={handleShow} title="Etymology" isActive={activeId === 1}>
        Bla bla
      </Panel>
    </>
  )
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  )
}
```

## Differences between rendering via a function and a component

Rendering via a function **cannot have lifecycle, state or hooks**, might be a bit faster than rendering via a component.

```jsx
const renderViaFunction = () => <div>Function</div>
const RenderViaComponent = () => <div>Component</div>

const App = () => {
  return (
    <>
      {renderViaFunction()} {/* Function */}
      <RenderViaComponent /> {/* Component */}
    </>
  )
}
```

## HOC

A Higher Order Component (HOC) contains certain logic that we want to apply to the another component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.  
HOCs can largely be replaced by Hooks as they can reduce the depth of the component tree and make the code more readable.

```jsx
// accept a Component as an argument
const withSomeLogic = (Component) => {
  // do something

  // return a component that renders the component from the argument
  return (props) => <Component {...props} />
}
```
