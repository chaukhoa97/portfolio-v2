---
title: 'Redux'
---

![One-way data flow](https://i.imgur.com/0yQz4vc.png)

1. The _Store_ provides all application states for the components to display on the UI (Single source of truth).
2. Người dùng tương tác lên UI, e.g. click button.
3. Component call `dispatch(Action obj)` hoặc `dispatch(Thunk)` - with `Thunk` is an async fn that also returns an _Action obj_.  
   An _action obj_ typically has the following format: `{ type: "SHOW_NOTIFICATION", text }`:

   - Property `type` to tell the store which reducer should be called.
   - Property `payload` (`payload.text`, `payload.value`...) as the arguments for the reducer.

4. Redux store dựa theo `type` của Action obj để gọi _reducerFn_ tương ứng và Update Store data dựa theo `storeState` & `payload`.
