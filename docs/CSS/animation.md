---
title: 'Animation'
---

## Transition vs Animation Usage

### Trigger Mechanism

- _Transitions_ are typically triggered by changes in an element's state e.g. hover
- _Animations_ are more autonomous and run without relying on changes in an element's state. They can be triggered by setting keyframes and durations, and they continue playing until explicitly stopped.

### Usage

- _Transitions_ are are suitable for simple effects, like fading in/out or changing colors on hover. They are best for single-state changes and are less suitable for complex, multi-step animations.
- _Animations_ are more versatile and can handle complex, multi-step animations. They are often used for things like loading spinners, scrolling effects, and other continuous or looping animations.

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
  animation: show 3s linear infinite;
}
```
