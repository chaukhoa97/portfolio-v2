---
title: 'Typescript Terms'
category: 'Typescript'
---

### Type Assertion

```ts
console.log(x as number)
```

### Intersection

```ts
type Customer = Identity & { gender: string }
```

```ts
interface Customer extends Identity {
  gender: string
}
```

### Generic Constraint

```ts
// Ràng buộc `T` phải ÍT NHẤT có `length` property
function minLength<T extends { length: number }>(a: T, b: number): T {
  if (obj.length >= minimum) {
    return obj
  }
  return { length: minimum }
}
```

### Non-null Assertion vs Optional Chaining

- `!`: Non-null assertion - Chỉ chạy lúc compile, nói với compiler là cái này ko null dc &rarr; dùng khi biết chắc obj có value rồi để skip runtime check.
- `?`: Optional chaining - Chỉ chạy lúc runtime, nếu ko có thì trả về `undefined` &rarr; dùng khi ko biết chắc obj có value hay ko để tránh crash.
