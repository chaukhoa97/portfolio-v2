---
title: 'React Hook Form'
---

## v7

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
