---
title: 'React Hook Form'
---

```jsx
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm()

  const onSubmit = () => console.log('submit')

  return (
    // Form basic 1: `handleSubmit` will validate your inputs before invoking `onSubmit`
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="checkbox"
        id="acceptTerms"
        // Form basic 2: UNIQUE `name` ("acceptTerms") for RHF doing its work, `options obj`: https://react-hook-form.com/api/useform/register
        {...register('acceptTerms', { required: true })}
      />
      {/* Form basic 3: errors.`inputUniqueName` */}
      {errors.acceptTerms && <span>Bro chưa accept kìa</span>}
      {/* Form Controller: Dùng để control các external UI components: MUI, Ant Design...: https://react-hook-form.com/docs/usecontroller/controller  */}
      <Controller
        // Form Controller 1: UNIQUE `name` ("email") and `rules` are similar to `Form basic 2`
        name="confirmPassword"
        rules={{
          required: true,
          // watch('password') -> Theo dõi value của input có name là "password"
          validate: (value) => value === watch('password'),
        }}
        //Form Controller 2: `control = {control}` is a must, Optional when using `FormProvider`
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            // Form Controller 3: Customize input value trước khi RHF xử lý.
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        )}
      />
      {errors.confirmPassword && <span>Ko trùng với mật khẩu ở trên</span>}
    </form>
  )
}
```
