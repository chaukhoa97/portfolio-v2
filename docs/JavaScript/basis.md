---
title: 'Basis'
---

## Callback

_Hàm_ dc truyền qua _argument_.
Usage: Gọi hàm khi có sự kiện xảy ra, thực hiện bất đồng bộ.

## Event loop

1. Synchronous execute the script until the **Call Stack** (LIFO) is empty. Các hàm _async_ vào **Call stack** thì dc di chuyển qua **Web api**. Ở **Web api** chạy async xong thì push callback vào **Task Queue**/**Microtask Queue**.

2. Select the oldest callback from **Microtask Queue** (`Promise`) to push into **Call Stack** and execute it. Repeat until the **Microtask Queue** is empty. This is the **Event Loop**.

3. Do the same like step 2 with **Task Queue** (`setTimeout`).

![Event loop](https://i.imgur.com/E1AuR7A.png)

### Example: Test this snippet [here](https://www.jsv9000.app/)

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

## Closure

Is the combination of a **Function** and its **Lexical environment** (_references_ to any other data from the outer scope that the function depends on). You can think of a function to have its own **"private"** variable.  
Closures của 1 function dc tạo ra ngay tại thời điểm declare function đó.

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
const result = f1() // execute `f1` returns `f2` -> những biến ở outer scope của f2 sẽ dc giữ lại.
result() // 2
result() // 4
console.log(x) // ❌ ReferenceError: Biến x chỉ dc sử dụng trong f1
```

### Tricky example

```js
// When using `var` in a `for` loop, the variable is hoisted to Global Scope.
for (var i = 0; i < 3; i++) {
  // There are 3 different `log` declaration here, which means there are 3 different Closures
  // With `var`, all 3 `log` access to the same global variable `i`, which after the loop, is 3.
  // With `let`, there is a different `i` in each `for` loop since it's Block Scope
  // and each `log` access to its own `i` (`i` is a part of `log` Closure).
  const log = () => console.log(i)
  setTimeout(log, 0)
}
```

## Hoisting

Là quá trình đưa các khai báo (declaration) hàm/biến lên trên đầu trang, nó được thực hiện tự động bởi JavaScript Engine

```js
add(3, 4); //* returns 7
// Function declaretion -> hoisting lên đầu
function add(num1, num2) {
  return num1 + num2;
}

//* Function expression -> ko hoisting
subtract(7, 4); //! Uncaught TypeError: subtract is not a function
var subtract = function (num1, num2) {
  return num1 - num2;
};
var x; // console.log(x) -> undefined
let y; // console.log(y) -> ERROR
const z; // ERROR ngay bước init
```

## var let const

|       |      Scope      |  Hoisting + Init value  | Re-declare | Update |
| :---: | :-------------: | :---------------------: | :--------: | :----: |
|  Var  | Global/Function |     ✅ (undefined)      |     ✅     |   ✅   |
|  Let  |      Block      | ✅(must be initialized) |     ❌     |   ❌   |
| Const |      Block      |   ✅(not initialized)   |     ❌     |   ✅   |

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
