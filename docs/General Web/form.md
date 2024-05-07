---
title: 'Form'
---

## React Hook Form v7

```tsx
import { useForm, SubmitHandler } from 'react-hook-form'
export default function SignUpForm() {
  type FormData = {
    confirmPassword: string
    date: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useForm<FormData>()

  console.log(watch('confirmPassword')) // subscribe to an input value, `watch()` to watch all inputs
  console.log(getValues()) // similar to `watch` but NOT subscribe to input changes or trigger re-renders

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

  return (
    // Form basic 1: `handleSubmit` will validate your inputs before invoking `onSubmit`
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="confirmPassword"
        // Form basic 2: UNIQUE `name` ("confirmPassword") for RHF doing its work
        // `options obj`: https://react-hook-form.com/api/useform/register
        {...register('confirmPassword', {
          required: true,
          validate: (value) => value === watch('password'),
        })}
      />
      {/* Form basic 3: errors.`uniqueName` */}
      {errors.confirmPassword && <span>Not match</span>}
      {/* Form Controller: Dùng để control các external UI components: MUI, Ant Design...: https://react-hook-form.com/docs/usecontroller/controller  */}
      <Controller
        // Form Controller 1: UNIQUE `name` ("email") and `rules` are similar to `Form basic 2`
        name="date"
        //Form Controller 2: `control = {control}` is a must, Optional when using `FormProvider`
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            // Form Controller 3.1: This `onBlur` sends the input's `onBlur` event to the library...
            onBlur={onBlur}
            // Form Controller 3.2: ... we can also customize input value before sending, if not need `onChange = {onChange}` is fine
            onChange={(e) => onChange(parseInt(e.target.value))}
            selected={!!value}
          />
        )}
      />
    </form>
  )
}
```

## Zod

Reason to use: More complex validation, type-safe, one source of truth for validation and type.

```tsx
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Instead of defining `rules` in `register` like above, we define those in a schema...
const schema = z
  .object({
    name: z
      .string()
      .refine((val) => val[0] === 'A', { message: 'Name must start with A' }),
    email: z.string().email(),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Type of form data is inferred from `zod` schema
type FormData = z.infer<typeof schema>

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      //... and only need to register the fields
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register('email')} />
      <input {...register('password')} />
      <input {...register('confirmPassword')} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Checkbox, Radio, Select

```jsx
export default function Form() {
  const [state, setState] = useState({
    check1: true,
    check2: 'bruh',
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
        <input
          type="checkbox"
          checked={state.check1}
          name="check1"
          // align-top; inline-block; w-3: For aligning checkbox with text
          className="align-top"
        />
        <span className="inline-block w-3">Check 1</span>
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
