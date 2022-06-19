---
title: 'CSS Snippets'
category: 'CSS'
draft: false
---

- **Flex items to hơn so với dự kiến**

  - A flex item cannot be smaller than the size of its content along the main axis.
  - Mặc định các flex item sẽ có `min-width/min-height: auto` -> Sửa thành `0` hoặc `overflow: hidden`.  
    Nên sửa ở high level component vì `auto` ở parent có thể override `0` ở children.

- **Center hoàn toàn**

  ```scss
  .item {
    // Ở đây thì mới chỉ là topleft corner của item nằm ở center của container
    // -> cần transform theo item size để hoàn toàn center item theo container
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
  }
  ```

- **Image scale with Container width**

  ```css
  .img-fluid {
    width: 100%;
    height: auto;
  }
  ```

- **Browser debug**

  ```js
  // Gõ in console tab -> Hover rồi đợi 3s -> Browser pause -> debug
  setTimeout(function () {
    debugger;
  }, 3000);
  ```

  ```css
  <!-- Thấy dc thằng nào overflow -- > * {
    outline: 1px solid #f00 !important;
  }
  ```

- **Swiper bug**

  ```css
  .promotions {
    display: flex; <!-- Gây bug width vô hạn -->
  }

  .promotion {
    max-width: 100% <!-- Bug fix -->
    flex: 1 1 100%;
  }
  ```

- **Ant Design**: Grid gutter gây overflow

  ```scss
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
  ```

- **react-slick** Carousel bị duplicate

  ```scss
  // Cách 1
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  // Cách 2
  .slick-slide {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  ```

- Hidden & Visible element

  ```scss
  div {
    display: none;
    transition: opacity 1s ease-out;
    opacity: 0;
  }
  div.active {
    opacity: 1;
    display: block;
  }
  ```

- `border-radius` ko hoạt động

  ```scss
  .div {
    overflow: hidden;
  }
  ```

- Hover cho `after/before`: pseudo class đứng trước pseudo element

  ```scss
  .alo:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    z-index: -1;
  }
  ```
