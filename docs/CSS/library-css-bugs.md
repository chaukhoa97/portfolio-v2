---
title: 'Library CSS Bugs'
---

### Ant Design: Grid gutter gây overflow

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

### react-slick: Carousel bị duplicate

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
