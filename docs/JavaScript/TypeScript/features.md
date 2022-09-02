---
title: 'Features'
---

## Indexed Access Types

```ts
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
]
type Person = typeof MyArray[0]
type Name = typeof MyArray[0]['name']
```

## Mapped Types

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}

// darkMode: boolean, newUserProfile: boolean
type FeatureOptions = OptionsFlags<FeatureFlags>
```

## Type Assertion

```ts
console.log(x as number)
```

## Generic Constraint

```ts
// Ràng buộc `T` phải ÍT NHẤT có `length` property
function minLength<T extends { length: number }>(a: T, b: number): T {
  if (obj.length >= minimum) {
    return obj
  }
  return { length: minimum }
}
```

## Non-null Assertion vs Optional Chaining

- `!`: Non-null assertion - Only runs at _Compile time_, nói với compiler là cái này ko `null` dc &rarr; dùng khi biết chắc obj có value rồi để skip runtime check.
- `?`: Optional chaining - Only runs at _Runtime_, nếu ko có thì trả về `undefined` &rarr; dùng khi ko biết chắc obj có value hay ko để tránh crash.

## [Type Assign Table](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability)

![Type Assign Table](https://i.imgur.com/OXp9Bta.png)

```ts
//* `undefined` ->(assign to) `void` ✅
const test1 = (x: void) => {}
test1(undefined) // Ok

//! object -> void ❌
const test2 = (x: void) => {}
test2({ id: 1 }) // Error
```

## Index Signature

```ts
interface JD {
  // An index signature property type must be either ‘string’ or ‘number’
  [index: string]: any //* JD can have any number of properties with `any` type
  1: string // typeof jd[1] = string
}
```

## Intersection

```ts
type Identity = {
  name: string
}
interface Contact {
  email: string
}
type Customer = Identity & Contact & { gender: string } // type cũng có thể dc tạo từ 2 interface intersection
interface Customer2 extends Identity, Contact {
  gender: string
}
```
