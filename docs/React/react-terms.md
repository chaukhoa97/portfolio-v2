---
title: 'React Terms'
---

### React Overview

1. **What is React?**: React is an open-source front-end JavaScript library that is used for building user interfaces, especially for single-page applications.
2. **Major features**:

   - **Virtual DOM** instead of **Real DOM**:
     - **Virtual DOM**: Là 1 bản sao in-memory của DOM, nơi mà việc cập nhật không gây ảnh hưởng hưởng tới Real DOM. Mỗi khi có state changes, React lấy snapshot của VDOM ngay lúc đó rồi so sánh với VDOM đã dc update (diffing). Những thay đổi này dc đưa đến ReactDOM library, và ReactDOM sẽ chỉ update Real DOM những gì cần update.
     - **So sánh VDOM vs Real DOM**: Real DOM chậm hơn vì mỗi khi DOM thay đổi, trình duyệt cần phải dựng lại UI ở ngoài browser, so với những thay đổi chỉ xảy ra ở trong memory của VDOM. Điểm còn thiếu của VDOM là render những thay đổi đó ngoài browser sẽ dc xử lý bởi ReactDom library.
   - **JSX syntax** (JavaScript XML)
   - **Reusable components**
   - Support **Server-side rendering**

3. **Props**: The object passed to the function component, included children. Props are like arguments you pass to a function. **They let a parent component pass data to a child component and customize its appearance**. For example, a Form can pass a color prop to a Button.

   ```tsx
   // Declaring type of props
   type AppProps = {
     message: string
   } /* use `interface` if exporting so that consumers can extend */
   const App = ({ message = 'default mess' }: AppProps): JSX.Element => (
     <div>{message}</div>
   )
   ```

4. **State**: State is like a component’s memory. **It lets a component keep track of some information and change it in response to interactions**. For example, a Button might keep track of isHovered state.

   ```jsx
   // 2 Component đều có props.name & props.children
   const C1 = ({ name, children }) => <div id={name}>{children}</div>
   const C2 = (props) => <div id={props.name}>{props.children}</div>
   ```

### Key in Array of Items

Để React biết dc item nào dc thêm/sửa/xóa để ko re-render thừa thãi.  
A good rule of thumb is that elements inside the `map()` call need keys.

Key của 1 element trong 1 array là thứ có giá trị riêng biệt với các element khác (siblings) của nó:

1. **ID** của element từ dữ liệu.
2. **Value** của element từ dữ liệu.
3. Tệ nhất: Dùng **index** của element trong array.

### Other Terms

- **Mount/Unmount**: Adding/Removing nodes to the DOM

- **Render**: Đưa vào/Thay đổi node ở trong DOM, nghĩa là với lần đầu đưa vào sẽ tương đương với Mount, những lần sau, khi state của component thay đổi, sẽ dc render lại (re-render) nhưng không phải là Mount (vì ko add thêm nodes vào DOM)

- **Fragment**: `<Fragment key = ...>` - thêm key vào dc so với chỉ dùng `<>`
