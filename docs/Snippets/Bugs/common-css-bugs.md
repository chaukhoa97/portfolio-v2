---
title: 'Common CSS Bugs'
---

### Flex items to hơn so với dự kiến

**A flex item cannot be smaller than the size of its content along the main axis.**

Mặc định các flex item sẽ có `min-width/min-height: auto` &rarr; Sửa thành `0` hoặc `overflow: hidden`.
_Có thể fix lỗi Swiper tràn width bằng cách trên_

```css
.parent {
  display: flex; /* Gây bug width vô hạn */
}

.children {
  min-width: auto;
  /* hoặc */
  overflow: hidden;
}
```

### `border-radius` ko hoạt động

```scss
.div {
  overflow: hidden;
}
```
