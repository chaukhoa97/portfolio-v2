---
title: 'Animation'
---

## Transition vs Animation Usage

_Transition_ is used for simple animations like changing color, size, etc.  
_Animation_ is used for complex animations like moving, rotating, etc.

## Transition

```css
div {
  transform: translateX(100px);
  transition: transform 1s ease;
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
  animation: show 1s ease-in-out infinite;
}
```
