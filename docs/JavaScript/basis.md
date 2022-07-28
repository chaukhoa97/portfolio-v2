---
title: 'Basis'
---

## Terms

### Callback

_Hàm_ dc truyền qua _argument_  
Gọi hàm khi có sự kiện xảy ra, thực hiện bất đồng bộ.

### Event loop

![Event loop](https://i.imgur.com/E1AuR7A.png)

1. Synchronous execute the script until the **Call Stack** (LIFO) is empty. Các hàm _async_ vào **Call stack** thì dc di chuyển qua **Web api**. Ở **Web api** chạy async xong thì push callback vào **Task Queue**/**Microtask Queue**.

2. Select the oldest finished one from **Microtask Queue** (`Promise`) to push into **Call Stack** and execute it. Repeat until the **Microtask Queue** is empty.
   This is the _Event Loop_.

3. Do the same like step 2 with **Task Queue** (`setTimeout`).

Test this snippet [here](https://www.jsv9000.app/)

```js
setTimeout(function a() {}, 500)
setTimeout(function b() {}, 0)
fetch('https://www.google.com').then(function c() {})
Promise.resolve().then(function d() {})
Promise.reject().catch(function e() {})
function f() {
  g()
}
function g() {}
f()
```

### Closure

Bao gồm: Function và References tới các biến ở outer scope của function đó (Lexical Environment). Trong JS, closures của 1 function dc tạo ra ở thời điểm declare function đó

```js
function f1() {
  let x = 0 // Dc giữ lại trong closure
  let y = 0 // Dc dọn dẹp bởi garbage collector
  return function f2() {
    // f2 truy cập dc variables ở outer scope
    x += 2
    console.log(x)
    return x
  }
}
const f3 = f1() // execute `f1` returns `f2` -> những biến ở outer scope của f2 sẽ dc giữ lại.
f3() // 2
f3() // 4
console.log(x) // ReferenceError: Biến x chỉ dc sử dụng trong f1
```

### Hoisting

Là quá trình đưa các khai báo (declaration) hàm/biến lên trên đầu trang, nó được thực hiện tự động bởi JavaScript Engine

```js
add(3, 4); //* returns 7
// Function declaretion &rarr; hoisting lên đầu
function add(num1, num2) {
  return num1 + num2;
}

//* Function expression &rarr; ko hoisting
subtract(7, 4); //! Uncaught TypeError: subtract is not a function
var subtract = function (num1, num2) {
  return num1 - num2;
};
var x; // console.log(x) -> undefined
let y; // console.log(y) -> ERROR
const z; // ERROR ngay bước init
```

### var let const

|       |      Scope      |  Hoisting + Init value  | Re-declare | Update |
| :---: | :-------------: | :---------------------: | :--------: | :----: |
|  Var  | Global/Function |     ✔️ (undefined)      |     ✔️     |   ✔️   |
|  Let  |      Block      | ✔️(must be initialized) |     ❌     |   ❌   |
| Const |      Block      |   ✔️(not initialized)   |     ❌     |   ✔️   |

Example:

```js
const obj = {}
obj.foo = 'bar' // {foo : 'bar'}
obj.foo = 'bar2' // {foo : 'bar2'}

const ar = []
ar.push('foo') // ['foo']
ar.pop() // []
```

```js
const text = 'a'
text = 'b' // error - re-assigning
const text = 'c' // error - re-declaring

obj = { key1: 'foo' } // error - re-assigning
const obj = { key1: 'foo' } // error - re-declaring
```

## Types

- **Primitive**:

  - string; number (NaN - Not a Number vẫn đc tính là number, Infinity, -Infinity); boolean; undefined;
  - null (typeof null === “object”) // Mặc dù behavior giống primitive nhưng lại là object
  - Ít dùng: symbol; bigint

- **Reference**:

  - object; array (typeof Object/Array === “object”)
  - function (typeof Function === “function")
  - Ít dùng: date; regexp; error;

- **Falsy values**: `0, “”, false, null, undefined, NaN`

## Operator

- **Optional Chaning**: `?.`: Nếu ko có, dừng lại và trả về `undefined`
- **Nullish coalescing**: `??`: Tương tự `OR`
  - `[0/""/false/NaN] ?? expr` &rarr; Vế trái
  - `null/undefined ?? expr` &rarr; expr

## ETC

- `==` - chỉ so value &rarr; null == undefined vs `===` - so luôn cả type
- ![Object.freeze vs .seal vs .preventExtensions ](https://imgur.com/SsK9doN.png)
- [Sự khác biệt map và weakmap](https://kieblog.vn/javascript-su-khac-biet-map-va-weakmap/)
