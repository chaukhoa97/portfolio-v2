---
title: 'SASS'
---

- Nested Routes

- Variable: `$sm: 576px`

- Mixin: Có thể dùng variable -> hợp với flexible style, như ở đây là phụ thuộc vào variable `$bgColor`, bù lại file css ra sẽ dài hơn.

  ```scss
  @mixin error($bgColor) {
    border: 1px solid $bgColor;
    background-color: #fff;
  }
  // Use the mixin in another `scss` file
  .someClass {
    @include error(#000);
  }
  ```

- Extend: Ko dùng variable -> hợp cho static style, file css ra cũng gọn hơn.
  ```scss
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
  ```
