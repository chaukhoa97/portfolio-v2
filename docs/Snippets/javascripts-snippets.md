---
title: 'JavaScript Snippets'
---

### Dynamic object key

```jsx
const { name, id } = event.target
setSearchParams({ [name]: id })
```

### Measure function runtime

```js
console.time('filter array')
const visibleTodos = getFilteredTodos(todos, filter)
console.timeEnd('filter array')
```

### Scroll to top

```jsx
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

### Shallow Copy vs Deep Copy

```js
var obj = [{ a: 1 }, { b: 2 }]
var shallow = _.clone(obj)
console.log(shallow[0] === obj[0]) // => true
var deep = _.cloneDeep(obj)
console.log(deep[0] === obj[0]) // => false
```
