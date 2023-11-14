---
title: 'Common CSS Bugs'
---

### Width of Flex item to hơn so với Container

**A flex item cannot be smaller than the size of its content along the main axis.**

Mặc định các flex item sẽ có `min-width/min-height: auto` &rarr; Sửa thành `0` hoặc `overflow: hidden`.  
**Fix lỗi _Swiper_: Item bị tràn width**

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

### Height of Flex item nhỏ hơn so với Container

An initial setting of a Flex container is `align-items: stretch` &rarr; Flex items will take up the **full height** of the Flex container. So this issue might fall into 1 of 2 cases:

1. The parent has `align-items: center` or any other value.
2. If a child has its height specified (e.g. `height: 100%`), then it will ignore the `align-items: stretch` coming from the parent (nghĩa là `height` bây giờ sẽ dựa theo content của item chứ ko còn stretch cho bằng với container nữa). For the `stretch` default to work, the child's height must be `auto`.  
   **Fix lỗi _Swiper_: Item's height ko cao = container (`autoHeight` prop ko dùng dc)**

   ```css
   .homepage-recommender .swiper-slide {
     height: auto;
   }
   ```

### Percentage height of an item doesn't work (`height: x%`)

If the parent height is not specified explicitly (i.e., it depends on content height) and this element is not absolutely positioned, the `height: x%` computes to `auto`.

### `border-radius` ko hoạt động

Dùng `overflow: hidden` cho element cha
