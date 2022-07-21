---
title: 'Data Flow'
---

## Moving State down

```jsx
const Parent = () => {
  const parentData = 'random data'
  return <Children childProp1={parentData} />
}
```

## Lifting State up

Ở đây, ta đã move state `isActive` của 2 Child (`Panel`) lên Parent (`Accordion`) để có thể phối hợp 2 `Panel` với nhau (chỉ có 1 `Panel` được _active_ tại một thời điểm - thằng này mở thì thằng kia phải đóng). And passing down the event handler to the child allowed the child to change the parent’s state.

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
