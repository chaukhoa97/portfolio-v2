---
title: 'Common CSS Bugs'
---

### Flex items to hơn so với Container

**A flex item cannot be smaller than the size of its content along the main axis.**

Mặc định các flex item sẽ có `min-width/min-height: auto` &rarr; Sửa thành `0` hoặc `overflow: hidden`.  
_Có thể fix lỗi Swiper tràn width bằng cách trên_

```css
.parent {
  display: flex; /* Gây bug width vô hạn */
}

.children {
  min-width: 0;
  /* hoặc */
  overflow: hidden;
}
```

### Flex items nhỏ hơn so với Container

An initial setting of a Flex container is `align-items: stretch` &rarr; Flex items will take up the **full height** of the Flex container.  
If a child has a height specified (e.g. `height: 100%`), then it will ignore the `align-items: stretch` coming from the parent (nghĩa là `height` bây giờ sẽ dựa theo content của item chứ ko còn stretch cho bằng với container nữa). For the `stretch` default to work, the child's height must compute to `auto`.

### Percentage height of an item doesn't work (`height: x%`)

If the parent height is not specified explicitly (i.e., it depends on content height) and this element is not absolutely positioned, the `height: x%` computes to `auto`.

### `border-radius` ko hoạt động

```scss
.div {
  overflow: hidden;
}
```
