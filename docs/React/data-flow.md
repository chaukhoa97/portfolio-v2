---
title: 'Data Flow'
---

- **Moving State down**:

```jsx
const Parent = () => {
  const parentData = 'random data'
  return <Children childProp1={parentData} />
}
```

- **Lifting Content up**:

```jsx
const Parent = () => {
  const handleChildrenButton = (value) => value + 1
  return <Children onChildrenButtonClick={handleChildrenButton} />
}
```

```jsx
const Children = ({ onChildrenButtonClick }) => {
  const childrenData = 10
  return <button onClick={() => onChildrenButtonClick(childrenData)} />
}
```
