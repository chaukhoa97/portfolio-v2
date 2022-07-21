---
title: 'Redux'
---

1. Component lấy data từ Store (Store State) để thể hiện trên UI (View).
2. Người dùng tương tác lên UI (Ex: onClick button ….).
3. Component call `dispatch(Action obj/Thunk - 1 async fn that also returns an Action obj)`.  
   Action obj có dạng: `{ type: "SHOW_NOTIFICATION", text }`:

   - `type` để store biết nên gọi reducer nào
   - `payload` (`payload.text`, `payload.value`...) làm tham số cho hàm reducer.

4. Redux store dựa theo `type` của Action obj để gọi _reducerFn_ tương ứng và Update Store data dựa theo `storeState` & `payload`.

![Core Redux Concepts](https://i.imgur.com/UFZ1opQ.png)
![Where should our logic code go?](https://i.imgur.com/Wtx9WvJ.png)
