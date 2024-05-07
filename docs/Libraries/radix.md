---
title: 'Radix'
---

## Extending a primitive

- `React.ElementRef<typeof AccordionPrimitive.Item>`: Ensures that `MyAccordionItem` forwards the correct `ref` type to the underlying `AccordionPrimitive.Item`.
- `React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>`: specifies the `props` that can be passed to `MyAccordionItem`, excluding the `ref` prop, as it's handled separately.

```tsx
import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

const MyAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('baseClasses...', className)}
    {...props}
  />
))
MyAccordionItem.displayName = 'MyAccordionItem'
```
