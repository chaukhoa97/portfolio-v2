---
title: 'Image'
---

## `sizes` & `srcset`

```jsx
<img
  src="default.jpg"
  // If the viewport is at least 1024px wide, the image width should be *above and close* to 50vw (512px)...
  sizes="(min-width: 768px) 35vw, (min-width: 1024px) 50vw, 100vw"
  // So it will choose `medium.jpg` because it's 800px wide, which is above and close to 512px
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
/>
```

## `picture` with `media`

```html
<picture>
  <!-- `srcset` tương tự như trên -->
  <source srcset="large.jpg, ultra.jpg 2x" media="(min-width: 1000px)" />
  <source srcset="medium.jpg" media="(min-width: 600px)" />
  <img src="small.jpg" alt="Baby Sleeping" />
</picture>
```

## `srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"` deep dive

For a device width of 320px, the following calculations are made, and the browser will aim for the <u>above and close to the minimum density</u>.

- `400w / 320px = 1.25`
- `800w / 320px = 2.5`
- `1200w / 320px = 3.75`

If the pixel density is `1`, the browser will use `400w` image because `1.25` is close and larger to `1`.
If the pixel density is `2`, the browser will use `800w` image because `2.5` is close and larger to `2`...

## Retina

_Retina_ is a marketing term from Apple, refers to a display with a pixel density bigger than 1 (2x or 3x). Nowadays all mobile devices also have a pixel density bigger than 1.
