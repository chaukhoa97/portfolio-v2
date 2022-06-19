---
title: 'Typescript Terms'
category: 'Typescript'
draft: false
---

- as ... : ... Assertion
- &: Intersection
- !: Non-null assertion - Chỉ chạy lúc compile, nói với compiler là cái này ko null dc -> dùng khi biết chắc obj có value rồi để skip runtime check
- ?: Optional chaining - Chỉ chạy lúc runtime, nếu ko có thì trả về undefined -> dùng khi ko biết chắc obj có value hay ko để tránh crash
- extends: Intersection || Conditional Types(Left assignable to Right? A : B) || Generic Constraint
