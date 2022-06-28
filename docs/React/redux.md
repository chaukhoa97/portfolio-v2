---
title: 'Redux'
---

1. Component lấy data từ Store (Store State) để thể hiện trên UI (View).
2. Người dùng tương tác lên UI (Ex: onClick button ….).
3. Component tạo ra một Action obj (Action Creator) bằng 1 trong 2 cách và gọi hàm `dispatch` với tham số là Action object vừa tạo.

   - Tự declare 1 action object (slice2 line 31)
   - Thunk: 1 async fn that returns the action object (slice2 line 16)

   Ví dụ 1 Action obj: `{ type: "SHOW_NOTIFICATION", text }`:

   - `type` để store biết nên gọi reducer nào
   - `payload` làm tham số cho hàm reducer.

4. Redux store dựa theo type của Action object để gọi reducerFn tương ứng và Update Store data dựa theo storeState & payload.

![Core Redux Concepts](https://i.imgur.com/UFZ1opQ.png)
![Where should our logic code go?](https://i.imgur.com/Wtx9WvJ.png)
