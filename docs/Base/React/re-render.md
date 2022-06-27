---
title: 'Re-render'
---

### React re-render component khi

- State (including updates from custom hooks your component consumes) change.
- Any [**Props** / **ContextValue** consumed by your component] changes.
- Parent của component re-render (trừ `React.memo`).

### Key in Array of Items: Để React biết dc item nào dc thêm/sửa/xóa để ko re-render thừa thãi

- A good rule of thumb is that elements inside the `map()` call need keys.
- Key của 1 element trong 1 array là thứ có giá trị riêng biệt với các element khác (siblings) của nó:
  1. **ID** của element từ dữ liệu.
  2. **Value** của element từ dữ liệu.
  3. Tệ nhất: Dùng **index** của element trong array.
