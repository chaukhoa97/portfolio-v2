---
title: 'Form'
---

## Checkbox, Radio, Select

```jsx
export default function Form() {
  const [state, setState] = useState({
    check1: true,
    check2: false,
    select: 'apple',
    radio: 'radio1',
  })

  const handleChange = (event) => {
    let value
    if (event.target.type === 'checkbox') {
      // We can add `value` attribute to checkbox e.g.
      // if adding `value='ok'` and change `event.target.checked` to `event.target.value`
      // we will have `check1: 'ok'` instead of `check1: true`.
      value = event.target.checked
    } else {
      value = event.target.value // Select and Radio
    }

    setState({ ...state, [event.target.name]: value })
  }

  return (
    <form onChange={handleChange}>
      <label>
        <input type="checkbox" checked={state.check1} name="check1" />
        Check 1
      </label>
      <label>
        <input type="checkbox" checked={state.check2} name="check2" />
        Check 2
      </label>
      <select name="select" value={state.select}>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </select>
      <label>
        <input
          type="radio"
          checked={state.radio === 'radio1'}
          value="radio1"
          name="radio"
        />
        Radio 1
      </label>
      <label>
        <input
          type="radio"
          checked={state.radio === 'radio2'}
          value="radio2"
          name="radio"
        />
        Radio 2
      </label>
    </form>
  )
}
```

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
