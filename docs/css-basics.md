---
title: 'CSS Basics'
category: 'CSS'
draft: false
---

### Flexbox: Main(`justify-content`)/Cross(`align-items`) Axis

1. `flex-grow` - MAX: Chỉ định tỷ lệ kích thước to nhất mà phần tử nên có so với các phần tử còn lại.

   - **(Default)** `0`: Kích thước của các phần tử sẽ khớp với nội dung bên trong -> có thể ko lắp đầy hết `Parent`.
   - `> 1`: Ví dụ có 2 phần tử: Child1: `grow: 1`, Child2: `grow: 3` -> Cả 2 sẽ lấp đầy `Parent` nhưng Child2 sẽ chiếm nhiều hơn.

2. `flex-shrink` - MIN: Kích thước nhỏ nhất mà phần tử nên có. Giá trị càng lớn thì phần tử càng nhỏ.

   - **(Default)** `1`: Take up the same amount of space at all times.
   - `0`: Bất chấp giữ nguyên kích thước, dẫu có phá vỡ layout.

3. `flex-basis` - IDEAL: Kích thước lý tưởng của phần tử. `content` —> `width` —> `flex-basis` (limted by max-width & min-width).
   - Không set `width` cho flex-item, chỉ nên set `flex-basis` cho nó.
   - **(Default)** `auto`: Dc tính toán theo nội dung và các phần tử khác.
   - `1000px`: Trình duyệt sẽ hiểu là "Hãy cố gắng dành ra `1000px` cho phần tử này". Cái này còn phụ thuộc vào nội dung của những phần tử khác - Nếu nội dung mấy phần tử khác mà to quá thì cũng chịu.

#### More ab flex-container

An initial setting of a Flex container is `align-items: stretch` -> Flex items will take up the full height of the Flex container.  
If a child has a height specified (e.g. `height: 100%`), then it will ignore the `align-items: stretch` coming from the parent. For the `stretch` default to work, the child's height must compute to `auto`.

#### Percentage Height to an item (`height: x%`)

If the parent height is not specified explicitly (i.e., it depends on content height) and this element is not absolutely positioned, the `height: x%` computes to `auto`.

### Box model: [Content + (Padding + Border)] + Margin

- `box-sizing: border-box` : Width/Height = `Content` + `Padding` + `Border`.
- `box-sizing: content-box` : Width/Height = `Content` -> `Padding` & `Border` làm width to hơn so với ý muốn.

### Display: `flex`, `grid`, `none` ...

- `inline`(span): ignore `width` & `height`, accept `margin` & `padding` but only push other elements horizontally away, not vertically.
- `inline-block`(button, select, input): Similar to inline, but `width` & `height` are accepted.
  ![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/inline-block.png?w=526&ssl=1)
- `block`(div, h3, p): Take up as much horizontal space as they can.

### Position: `fixed`, `sticky`(`relative` + `fixed`), `static`

- `absolute`: If a child element has `absolute` then the parent element will xem như child ko có ở đó luôn. Để children absolutely position theo parent thì parent phải có position là `relative` hoặc `absolute`.
- `relative`: Ở chỗ cũ như `static`, nhưng khác với `static` là bây giờ `left/right/top/bottom/z-index` sẽ hoạt động.

### ETC

- **Pseudo-class:** Define a special state of an element:
  - `article p:nth-child(2)`: Select every `<p>` that is the second child of its parent (ở đây là article).
  - `article p:nth-of-type(2)`: Select every `<p>` that is the second `<p>` of its parent.
  - `button:active`: Select the button when it is clicked.
- **Pseudo-element::** Style specified parts of an element:

  ```css
  p::before { content: '', color:... }
  ```

- **Unit**: px vw vh rem em %
- ```css
  @media screen and (max-width: 768px) - Tương đương width <= 768px;
  ```

- ```css
  transform: translateX(100px) -> transistion: width 2s, transform 1s ease
  ```

- ```css
  @keyframes dance { 0% {...} 100% {...} } -> animation: dance 1s infinite
  ```
