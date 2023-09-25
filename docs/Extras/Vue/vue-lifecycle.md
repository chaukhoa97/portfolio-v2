---
title: 'Vue Lifecycle'
---

![Lifecycle](https://vuejs.org/assets/lifecycle.16e4c08e.png)

:::caution
If the page use SSR or u must interact with the DOM by [Template Refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs), the logic should be put **ONLY AFTER** post-mount lifecycle hooks, which means `onMounted` onwards.
:::

## Lifecycle hooks

- `beforeCreate` - Called immediately after instance is initialized, before options are processed.
- `created` - Called after the instance has been created.

:::note

`beforeCreate` & `created` are **NOT** need when using the composition API (`beforeCreate` &rarr; `setup` &rarr; `beforeCreate`). Simply put the code in `setup` method.

:::

- `beforeMount` - Right before mounting of the DOM begins
- `mounted` - Called when the instance has been mounted (browser updated).
- `beforeUpdate` - Called when reactive data has changed, before the DOM is re-rendered.
- `updated` - Called when reactive data has changed, and the DOM has been re-rendered.
- `beforeUnmount` - Called right before the Vue instance is destroyed.
- `unmounted` - Called after the Vue instance has been destroyed.
- `activated` - Used for `<keep-alive>` , when a component inside `<keep-alive>` is toggled on.
- `deactivated` - Used for `<keep-alive>`, when a component inside `<keep-alive>` is toggled off.
- `errorCaptured` - Called when an error from any descendent component is captured.

## `setup`

![setup](https://i.imgur.com/Xrx59o2.png)
