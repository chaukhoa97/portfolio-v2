---
title: 'Form'
---

## Checkbox

```jsx
export default function Form() {
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => setChecked(e.target.checked)

  return (
    <form>
      <label>
        Nest the `input` inside a `label` will make clicking the label focus the
        input without using `htmlFor` and `id`
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          name="subscribe"
          value="newsletter"
        />
        Subscribe to newsletter
      </label>
      `defaultChecked` and `defaultValue` specify the initial value (CONTROLLED),
      but leave subsequent updates UNCONTROLLED
      <input
        type="checkbox"
        id="option1"
        name="option"
        value="1"
        defaultChecked
      />
      <label for="option1">Option 1</label>
      <input type="checkbox" id="option2" name="option" value="2" />
      <label for="option2">Option 2</label>
    </form>
  )
}
```

- If the 1st checkbox is checked when the form is submitted, the form data will include `subscribe=newsletter`. Otherwise, the form data will not include a `subscribe` field.
- For the 2nd and 3rd checkboxes, using `Object.fromEntries` will only have the last checked value (`option=2`). Instead, we can use `formData.getAll('option')` to get all the checked values (`['1', '2']`).

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
    console.log(formData)
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
  // Optional: Using `ref` for form -> Có thể gọi hàm e.g. clear the form via `formRef.current.reset()`
  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, message } = e.target.elements
    formRef.current.reset()
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
