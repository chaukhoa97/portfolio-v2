---
title: 'React Essentials'
sidebar_position: 1
---

## Key

Basically, keys in React are used to specify the position of the elements within their parent. It helps React infer what exactly happened, and make the correct updates to the DOM.  
Keys are NOT globally unique. They only need to be unique among their siblings. The most common use case of `key` is in a list of items. But it can also be useful in some case when you need to tell React not to preserve the state of a component when the DOM tree structure match up with the previous one.

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. `index`: In fact, that’s what React will use if you don’t specify a `key` at all. If the list order changes when an item is inserted, delete or if the array is sorted, it will leads to confusing bugs.

## Virtual DOM

An in-memory copy of the Real DOM.

### How it works in React

When there are [re-renders](../React/react-lifecycle.mdx#step-1-react-trigger-render-initial-hoặc-re-render-component), while rendering ([1st phase](./react-lifecycle.mdx#step-1-react-trigger-render-initial-hoặc-re-render-component)), React will compute the diffs between what's _currently on the page_ vs what _should be on the page_, calculate the minimal necessary DOM operations to make the DOM match the latest rendering output, and finally batch executes all updates in the _commit phase_.

### Cons

Using Virtual DOM is NOT faster because it's actually an **addition** to the final operations on the real DOM (_diffing_ is NOT free). It is only faster because it can reduce the number of DOM operations if we do the comparison in a more complex context when the real DOM doesn't have a way to optimize updates (e.g. batch updates, or list updates).

### Why React still uses Virtual DOM

Although more recent frameworks have their way to reduce DOM operations without using Virtual DOM, in real-world applications, the Virtual Dom is usually fast enough. It's not easy to change a fundamental part of a complex library like React and after a certain point, performance is no longer the main selling point of a library or framework, especially when the difference is only in microseconds.

Using Virtual DOM also opens up possibilities to decouple rendering logic from the actual DOM - makes it straightforward to reuse it in non-browser environments, e.g. native mobile rendering in **React Native**, rendering to a string (**SSR**).

### Recent frameworks compiler

React, Vue, Angular ship JS code to the browser to make ur code work at the runtime. More recent frameworks have their own **compiler** that knows at _Build time_ how things could change in your app, rather than waiting to do the work at _Runtime_.  
It compiles your _declarative_ code into _efficient imperative_ code that works with **native browser APIs**, so the Virtual Dom can do less work &rarr; High performance and small package.

### Virtual DOM in Vue

Vue still uses Virtual Dom partially but Evan You want to take the _template_ and compile it to something that's **NOT** Virtual Dom at all, similar to **SolidJS** or **Svelte**: Directly create a piece of HTML DOM, and generate code that _binds individual nodes to reactive expressions_ instead of walking the whole DOM to figure out which node should each reactive expression bind to.

## Data Flow

### Moving State down

```jsx
const Parent = () => {
  const parentData = 'random data'
  return <Children childProp1={parentData} />
}
```

### Lifting State up

> Passing down the **event handler** allows the child to change the parent’s state.

Ở đây, ta đã move state `isActive` của 2 Child (`Panel`) lên Parent (`Accordion`) để có thể phối hợp 2 `Panel` với nhau (chỉ có 1 `Panel` được _active_ tại một thời điểm - thằng này mở thì thằng kia phải đóng).

```jsx
export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Bla bla
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
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

## Controlled vs Uncontrolled Form

```jsx title='Controlled.jsx'
// State của <form> do React quản lý
export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  })
  const handleChange = (e) => {
    // onChange -> `formData` dc update -> Value của <form> update theo
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} value={formData.name} />
      <textarea
        name="message"
        onChange={handleChange}
        value={formData.message}
      />
      <button>Submit</button> {/* Or <input type='submit' /> */}
      {/* Nếu k có type="button" thì sẽ mặc định là type="submit" -> submit */}
      <button type="button">Do other stuff</button>
    </form>
  )
}
```

```jsx title='Uncontrolled.jsx'
// State của <form> là internal state
export default function Form() {
  // `formRef.current` is binded to the <form> -> Có thể gọi hàm ví dụ như `formRef.current.focus()`
  const formRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, message } = e.target.elements // Các child của <form>, ở đây là <input> & <textarea>
    console.log(name.value, message.value)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="name" />
      <textarea name="message" />
      <button>Submit</button>
    </form>
  )
}
```

## Events

- [Events propagate upwards (children trước parent sau). Call `e.stopPropagation()` on the first argument to prevent that](https://beta.reactjs.org/learn/responding-to-events#event-propagation).
- [Events may have unwanted default browser behavior (Ex: The page reload when we submit a form). Call `e.preventDefault()` to prevent that](https://beta.reactjs.org/learn/responding-to-events#preventing-default-behavior).
