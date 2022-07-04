---
title: 'CSS'
---

### Center hoàn toàn

```scss
.item {
  // Ở đây thì mới chỉ là topleft corner của item nằm ở center của container
  top: 50%;
  left: 50%;
  // -> cần transform theo item size để hoàn toàn center item theo container
  transform: translate(-50%, -50%);
  position: relative;
}
```

### Image scale with Container width

```css
.img-fluid {
  width: 100%;
  height: auto;
}
```

### Hidden & Visible element

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

### Hover cho `after/before`: pseudo class đứng trước pseudo element

```scss
.alo:hover::before {
  content: '';
}
```
