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
interface Customer extends Identity { gender: string }
```

### `extends`: Intersection || Generic Constraint

### Non-null Assertion vs Optional Chaining

- !: Non-null assertion - Chỉ chạy lúc compile, nói với compiler là cái này ko null dc -> dùng khi biết chắc obj có value rồi để skip runtime check
- ?: Optional chaining - Chỉ chạy lúc runtime, nếu ko có thì trả về undefined -> dùng khi ko biết chắc obj có value hay ko để tránh crash
