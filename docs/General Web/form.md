---
title: 'Form'
---

## Controlled vs Uncontrolled Form in React

```jsx title='Controlled.jsx'
// State của <form> do React quản lý
export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Do something with formData
  }

  return (
    <form onSubmit={handleSubmit} value={formData} onChange={handleChange}>
      <input name="name" />
      <textarea name="message" />
      <button>Submit</button> {/* Or <input type='submit' /> */}
      <button type="button">Do other stuff (not submit)</button>
    </form>
  )
}
```

```jsx title='Uncontrolled.jsx'
// State của <form> là internal state
export default function Form() {
  // Most of the time: Using `ref` for form -> Có thể gọi hàm e.g. clear the form via `formRef.current.reset()`
  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries()) // { name: 'John', age: '30' }
    formRef.current.reset()
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

## Checkbox and Radio

```jsx
export default function Form() {
  const [state, setState] = useState({
    item1: true,
    item2: false,
    option: 'option2',
  })

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setState({
      ...state,
      [event.target.name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(JSON.stringify(state))
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <label>
        <input type="checkbox" checked={state.item1} name="item1" />
        Item 1
      </label>
      <label>
        <input type="checkbox" checked={state.item2} name="item2" />
        Item 2
      </label>
      <label>
        <input
          type="radio"
          checked={state.option === 'option1'}
          value="option1"
          name="option"
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          checked={state.option === 'option2'}
          value="option2"
          name="option"
        />
        Option 2
      </label>
      <button>Submit</button>
    </form>
  )
}
```

- We can add `value` attribute to checkbox e.g. if adding `value='ok'` and change `event.target.checked` to `event.target.value` we will have `item1: ok` instead of `item1: true`.
