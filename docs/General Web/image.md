---
title: 'Image'
---

## `srcset` and `sizes`

```jsx
<img
  src="default.jpg"
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  // If the viewport is at least 768px wide, the image width will be 50vw.
  sizes="(min-width: 768px) 50vw, (min-width: 1024px) 66vw, 100vw"
/>
```

### `srcset`

The following calculations are made:

- 400/320 = 1.25
- 800/320 = 2.5
- 1200/320 = 3.75

For a device width of 320px and pixel density of 1, the browser will use 1.25 because it is the closest -> `400w` image.
For a device width of 320px and pixel density of 2, the browser will use the <u>closet resolution above the minimum</u> -> 2.5 -> `800w` image.

## `picture`

```html
<picture>
  <source srcset="large.jpg, large2x.jpg 2x" media="(min-width: 1000px)" />
  <source srcset="medium.jpg" media="(min-width: 600px)" />
  <img src="small.jpg" alt="Baby Sleeping" />
</picture>
```

## Retina

_Retina_ is a marketing term from Apple, refers to a display with a pixel density bigger than 1 (2x or 3x). Nowadays all mobile devices also have a pixel density bigger than 1.
