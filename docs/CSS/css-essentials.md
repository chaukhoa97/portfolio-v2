---
title: 'CSS Essentials'
sidebar_position: 1
---

## Flexbox

### `flex`

- `flex: initial` = `flex: 0 1 auto`
- `flex: auto` = `flex: 1 1 auto`
- `flex: none` = `flex: 0 0 auto`
- `flex: 1` = `flex: 1 1 0%`

### Details

1. `flex-grow` - MAX: Chỉ định tỷ lệ kích thước to nhất mà phần tử nên có so với các phần tử còn lại.

   - `0` (**Default**): Kích thước của các phần tử sẽ khớp với nội dung bên trong &rarr; có thể ko lắp đầy hết `Parent`.
   - `>= 1`: Ví dụ có 2 phần tử: Child1: `grow: 1`, Child2: `grow: 3` &rarr; Cả 2 sẽ lấp đầy `Parent` nhưng Child2 sẽ chiếm nhiều hơn gấp 3 lần.

2. `flex-shrink` - MIN: Kích thước nhỏ nhất mà phần tử nên có. Giá trị càng lớn thì phần tử càng nhỏ.

   - `1` (**Default**): Take up the same amount of space at all times.
   - `0`: Bất chấp giữ nguyên kích thước, dẫu có phá vỡ layout.

3. `flex-basis` - IDEAL: Kích thước lý tưởng của phần tử.  
   Priority: `flex-basis` (limted by max-width & min-width) > `width` > `content`. Vì vậy chỉ nên set `flex-basis` cho flex item thay vì set `width` cho nó.
   - `auto` (**Default**): Dc tính toán theo nội dung và các phần tử khác.
   - `1000px`: Trình duyệt sẽ hiểu là "Hãy cố gắng dành ra `1000px` cho phần tử này". Cái này còn phụ thuộc vào nội dung của những phần tử khác - Nếu nội dung mấy phần tử khác mà to quá thì cũng chịu.

### Other properties

- `order: -1`: Default `0`. Số nhỏ xếp trước.
- `align-self`: Override `align-items` của flex container.

## Box model

- `box-sizing: content-box` : Size = `Content` &rarr; `Padding` & `Border` làm width to hơn so với ý muốn.
- `box-sizing: border-box` : Size = `Content` + `Padding` + `Border`.

## Display

- `flex`, `grid`, `none`
- `inline`(span): ignore `width` & `height`, accept `margin` & `padding` but only push other elements horizontally away, not vertically.
- `inline-block`(button, select, input): Similar to inline, but `width` & `height` are accepted.
  ![inline-block](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/inline-block.png?w=526&ssl=1)
- `block`(div, h3, p): Take up as much horizontal space as they can.

## Position

- `fixed`, `sticky`(`relative` + `fixed`), `static`
- `absolute`: The parent will behave like the `absolute` children is not there at all. Để children absolutely position theo parent thì parent phải có position là `relative` hoặc `absolute`.
- `relative`: Ở chỗ cũ như `static`, nhưng khác với `static` là bây giờ `left/right/top/bottom/z-index` sẽ hoạt động.

## Selector

### [Pseudo-class](https://www.w3schools.com/css/css_pseudo_classes.asp)`:` Define a special state of an element

- `article p:nth-child(2)`: Select every `<p>` that is the second child of its parent (ở đây là `<article>`).
- `article p:nth-of-type(2)`: Select every `<p>` that is the second `<p>` of its parent.
- `button:active`: Select the button when it is clicked.

### [Pseudo-element](https://www.w3schools.com/css/css_pseudo_elements.asp)`::` Style specified parts of an element

```css
p::before { content: '', color:... }
```

### [Reference selector](https://www.w3schools.com/cssref/css_selectors.asp)

- `a[href *= ".com"]`: Select những href **containing** ".com".
- `#sentence > p`: Các `p` ở tập hợp con **nhỏ hơn 1 bậc** so với id "sentence".
- `.sentence + p`: MỘT `p` **duy nhất liền sau** kết thúc của class "sentence".
- `.sentence ~ p`: TẤT CẢ các `p` **liền sau** kết thúc của class "sentence"

## `transform` & `transistion`

```css
div {
  transform: translateX(100px);
  transistion: width 2s, transform 1s ease;
}
```

## Animation

```css
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

div {
  animation: show 1s infinite;
}
```

## Element height

Thường không nên chỉnh độ cao của element. Nhưng nếu có thì nên dùng `min-height`. Vì nếu viewport nhỏ lại thì element cũng sẽ tự cao ra cho vừa với content, còn nếu chỉ dùng `height` mà nhỏ quá thì bị overflow.  
`min-height` PHẢI là _absolute unit_ (px, rem,...). Nếu `min-height` là % thì `height` của container phải là _absolute unit_ (Không được là % hết)

## Image Properties

### `background-size`

- `background-size: cover` &rarr; Luôn cover hết container dẫu có stretch.
- `background-size: contain` &rarr; Luôn show ảnh đúng, dẫu có chừa lại khoảng trống trong container.

:::note
Khi dùng `background-image`, set `width` cho container không có tác dụng, chỉ khi set `height` mới có tác dụng.
:::

### `object-fit`

- `object-fit: fill`_(default)_: Fills the container nhưng bị stretch - **GIỐNG** `background-size: cover`
- `object-fit: cover`: Fills the container nhưng bị cắt bớt (giữ nguyên aspect ratio) - **KHÁC** `background-size: cover`
- `object-fit: contain`: Luôn show ảnh đúng, dẫu có chừa lại khoảng trống trong container - **GIỐNG** `background-size: contain`
