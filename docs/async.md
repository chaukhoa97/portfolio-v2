---
title: 'Async'
category: 'JavaScript'
draft: false
---

### 1xx -> 5xx response: Information, Succeed, Redirection, Client Err, Server Err

### Axios vs Fetch

Fetch phải tốn thêm 1 promise (`.json()`), ngoài ra trong các lệnh như POST,PATCH,... phải convert data bằng JSON.stringify. Axios có thể trực tiếp handle error bằng `catch` còn Fetch thì phải check `response.ok`

```jsx
//1 GET
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => console.log('response', response.data))
  .catch((err) => console.log(err));

//1 POST - Creating a Resource
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    email: '@gmail.com',
    password: 'yolo',
  }),
})
  .then((res) => {
    if (!res.ok) throw Error(res.status); // throw -> thoát luôn ra khỏi hàm, ko return
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

axios
  .post('https://jsonplaceholder.typicode.com/posts', {
    email: '@gmail.com',
    password: 'yolo',
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));
```
