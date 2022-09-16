---
title: 'Redux'
---

1. Component lấy data từ Store (Store State) để thể hiện trên UI (View).
2. Người dùng tương tác lên UI (Ex: onClick button ….).
3. Component call `dispatch(Action obj)` hoặc `dispatch(Thunk)` - with `Thunk` is an async fn that also returns an _Action obj_.  
   An _action obj_ typically has the following format: `{ type: "SHOW_NOTIFICATION", text }`:

   - Property `type` to tell the store which reducer should be called.
   - Property `payload` (`payload.text`, `payload.value`...) as the arguments for the reducer.

4. Redux store dựa theo `type` của Action obj để gọi _reducerFn_ tương ứng và Update Store data dựa theo `storeState` & `payload`.

![Core Redux Concepts](https://i.imgur.com/UFZ1opQ.png)
![Where should our logic code go?](https://i.imgur.com/Wtx9WvJ.png)
