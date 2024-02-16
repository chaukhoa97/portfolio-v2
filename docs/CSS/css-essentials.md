---
title: 'CSS Essentials'
sidebar_position: 1
---

## Image Properties

|                                                             | Preserve aspect ratio | Fill the container |
| ----------------------------------------------------------- | --------------------- | ------------------ |
| `object-fit: fill`(**default**) == `background-size: cover` | ❌ (stretch)          | ✅                 |
| `object-fit: cover` != `background-size: cover`             | ✅                    | ✅ (cropped)       |
| `object-fit: contain` == `background-size: contain`         | ✅                    | ❌ (empty space)   |

## Element height

Usually shouldn't change the `height` nhưng nếu có thì nên dùng `min-height`. Vì nếu viewport nhỏ lại thì element cũng sẽ tự cao ra cho vừa với content.

## Selector

### [Pseudo-class](https://www.w3schools.com/css/css_pseudo_classes.asp)`:` Define a special state of an element

- `article p:nth-child(2)`: Select every `<p>` that is the 2nd child of its parent.
- `article p:nth-of-type(2)`: Select every `<p>` that is the 2nd `<p>` of its parent.
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

## `inherit` vs `initial` vs `unset`

- `inherit`: kế thừa thuộc tính của các phần tử cha gần nó nhất.
- `initial`: sử dụng style mặc định của trình duyệt.
- `unset`: `parentHasStyle ? inherit : initial`

## `z-index`

- Root
  - DIV #1
  - DIV #2
  - DIV #3
    - DIV #4
    - DIV #5
    - DIV #6

![z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context/understanding_zindex_04.png)

## Flexbox

### [Aligning Flex Items along the Main/ Cross Axis](https://stackoverflow.com/a/33856609/13255516)

#### Main Axis

`justify-content` and `auto` margins

#### Cross Axis

- `align-items`: Align flex items along the cross axis.
- `align-self`: Override `align-items` of the flex container.
- [`align-content`](https://tailwindcss.com/docs/align-content): Control how rows are positioned in multi-row flex and grid containers

### `flex` property details

1. `flex-grow` - MAX: Chỉ định tỷ lệ kích thước to nhất mà phần tử nên có so với các phần tử còn lại.

   - `0` (**Default**): Kích thước của các phần tử sẽ khớp với nội dung bên trong &rarr; có thể ko lắp đầy hết `Parent`.
   - `>= 1`: Ví dụ có 2 phần tử: Child1: `grow: 1`, Child2: `grow: 3` &rarr; Cả 2 sẽ lấp đầy `Parent` nhưng Child2 sẽ chiếm nhiều hơn gấp 3 lần.

2. `flex-shrink` - MIN: Kích thước nhỏ nhất mà phần tử nên có. Giá trị càng lớn thì phần tử càng nhỏ.

   - `1` (**Default**): Take up the same amount of space at all times.
   - `0`: Bất chấp giữ nguyên kích thước, dẫu có phá vỡ layout.

3. `flex-basis` - IDEAL: Kích thước lý tưởng của phần tử.  
   Priority: `flex-basis` (limted by `max-width` & `min-width`) > `width` > `content`. Vì vậy chỉ nên set `flex-basis` cho flex item thay vì set `width` cho nó.
   - `auto` (**Default**): Dc tính toán theo nội dung và các phần tử khác.
   - `1000px`: Trình duyệt sẽ hiểu là "Hãy cố gắng dành ra `1000px` cho phần tử này". Cái này còn phụ thuộc vào nội dung của những phần tử khác - Nếu nội dung mấy phần tử khác mà to quá thì cũng chịu.

## Width: `min-content` vs `max-content` vs `fit-content`

```css
.box {
  width: fit-content;

  /* ... is the same as ... */
  width: auto;
  min-width: min-content;
  max-width: max-content;
}
```

![Example](https://i.imgur.com/jemIV5A.png)

## `clientWidth`, `offsetWidth`, `scrollWidth`

![clientWidth, offsetWidth, scrollWidth](https://i.stack.imgur.com/5AAyW.png)

- `clientWidth`, `clientHeight`: The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.
- `offsetWidth`, `offsetHeight`: The size of the visual box incuding all borders. Can be calculated by adding width/height and paddings and borders, if the element has `display: block`.
- `scrollWidth`, `scrollHeight`: The size of all of the box's content, including the parts that are currently hidden outside the scrolling area. Can not be calculated directly from CSS, depends on the content.
- `scrollbarWidth` = `offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth`

## Display

- `inline`(`<span>`) vs `inline-block`(`button, select, input`):

  - Same: Size depends on content, can be aligned with `vertical-align`.
  - Difference: `inline` ignores `width` & `height`, accepts `margin` & `padding` but <u>only horizontally</u>. Vertical space it takes up depends on `line-height`.
    ![inline-block](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/inline-block.png?w=526&ssl=1)

- `block`(`div, h3, p`): Take up as much horizontal space as they can.
- `flex`, `grid`, `none`

## Position

- `absolute`: The element is removed from the flow of the page and positioned at a specified position relative to its closest _positioned_ (elements which have a `position` value which is not `static`) ancestor if any, or otherwise relative to the initial containing block. These elements do not affect the position of other elements.
- `fixed`: The element is removed from the flow of the page and positioned at a specified position relative to the viewport and doesn't move when scrolled.
- `sticky`: Sticky positioning is a hybrid of `relative` and `fixed` positioning. The element is treated as `relative` positioned until it crosses a specified threshold, at which point it is treated as `fixed`-positioned.
- `relative`: Ở chỗ cũ như `static`, but now can be adjusted relative to itself, without changing layout (and thus leaving a gap for the element where it would have been) e.g. we can use `left/right/top/bottom/z-index`.
- `static`

:::note

Without any `z-index` value, elements stack in the order that they appear in the DOM (the lowest one down at the same hierarchy level appears on top)
:::

### `transform: translate(1px)` vs `left/right/top/bottom`

- `transform: translate(1px)`: Move the element without affecting the position of other elements.
- `left/right/top/bottom`: Move the element and affect the position of other elements if:
  - The element is `relative` positioned (not `absolute` or `fixed` as these remove the element from the normal flow of the page).
  - Other elements are positioned based on the `relative` element.

## Box model

- `box-sizing: content-box` : Size = `Content` &rarr; `Padding` & `Border` làm width to hơn so với ý muốn.
- `box-sizing: border-box` : Size = `Content` + `Padding` + `Border`.

### `border` vs `outline`

`outline` is not a part of the box model. It is drawn outside the element's border. It doesn't take up space, so the element's width and height are not affected. Use cases:

- `outline: none` to remove the focus ring
- Overflow detect:

  ```css title='main.css'
  * {
    outline: 1px solid #f00 !important;
  }
  ```
