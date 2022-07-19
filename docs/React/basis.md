---
title: 'Basis'
---

### Features

- **What is React?**: React is an open-source front-end JavaScript library that is used for building user interfaces, especially for single-page applications.
- **JSX syntax**: Provide us JS functionalities along with HTML like template syntax.
- **Reusable components**
- Support **Server-side rendering**

### Terms

- **Mount/Unmount**: Adding/Removing nodes to the DOM
- **Render**: Đưa vào/Thay đổi node ở trong DOM, nghĩa là với lần đầu đưa vào sẽ tương đương với Mount, những lần sau, khi state của component thay đổi, sẽ dc render lại (re-render) nhưng không phải là Mount (vì ko add thêm nodes vào DOM)

### Events

- [Events propagate upwards (children trước parent sau). Call `e.stopPropagation()` on the first argument to prevent that](https://beta.reactjs.org/learn/responding-to-events#event-propagation).
- [Events may have unwanted default browser behavior (Ex: The page reload when we submit a form). Call `e.preventDefault()` to prevent that](https://beta.reactjs.org/learn/responding-to-events#preventing-default-behavior).

### **Virtual DOM** vs **Real DOM**

- **Virtual DOM**: Là 1 bản sao in-memory của DOM, nơi mà việc cập nhật không gây ảnh hưởng hưởng tới Real DOM. Mỗi khi có state changes, React lấy snapshot của VDOM ngay trước đó rồi so sánh với VDOM đã dc update (diffing). Những thay đổi này dc đưa đến ReactDOM library, và ReactDOM sẽ chỉ update Real DOM những gì cần update.
- **So sánh VDOM vs Real DOM**: Real DOM chậm hơn vì mỗi khi DOM thay đổi, trình duyệt cần phải dựng lại UI ở ngoài browser, so với những thay đổi chỉ xảy ra ở trong memory của VDOM. Điểm còn thiếu của VDOM là render những thay đổi đó ngoài browser sẽ dc xử lý bởi ReactDom library.

### Key in Array of Items

Để React biết dc item nào dc thêm/sửa/xóa để ko re-render thừa thãi.  
A good rule of thumb is that elements inside the `map()` call need keys.

Key của 1 element trong 1 array là thứ có giá trị riêng biệt với các element khác (siblings) của nó:

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. Tệ nhất: Dùng **index** của element trong array. Có thể dùng tạm nếu list này là fixed.
