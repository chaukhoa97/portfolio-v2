---
title: 'React Snippets'
category: 'React'
draft: false
---

- **`useState` update dựa theo previous state; Lazy init - `expenseviveFn` chỉ chạy ở lần render đầu tiên để tạo ra giá trị init của state; Pass callback vào `onClick`**

  ```jsx
  const expensiveFn = () => 100;
  // Hoặc useState(() => expensiveFn()); KHÔNG PHẢI useState(expenseiveFn())
  const [count, setCount] = useState(expensiveFn);
  <button onClick={() => setCount(0)}>Reset</button> // Normal
  <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>; // Theo prev state
  ```

- **Show obj ra page**

  ```jsx
  Object.entries(product).map(([key, val]) => (
    <Fragment key={key}>
      <p style={{ color: 'red' }}>{key}</p>
      <pre>{JSON.stringify(val, null, 2)}</pre>
    </Fragment>
  ));
  ```

- **Module CSS**

  ```jsx
  import styles from '../nav.module.scss';
  <h1 className={`${styles['active-nav']} ${styles.red}`}>Hello</h1>;
  ```

- **Nested components**

  ```jsx
  // Tách riêng Child ra vì Child ở trong Parent bị re-define khi Parent re-render
  const Child = ({ onClick }) => {
    return <button onClick={onClick}>+</button>;
  };

  const Parent = () => {
    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return <Child onClick={handleClick} />;
  };
  ```

- **Portal**:

  ```jsx
  import { createPortal } from 'react-dom';
  const MyComponent = () => {
    return (
      <div>
        {createPortal(
          <h2>This h2 will be brought to #portal</h2>,
          document.querySelector('#portal') // nơi render trong index.html
        )}
      </div>
    );
  };
  ```

- **Hydration Error React 18 + Next.js**:

  ```jsx
  const [mounted, setMounted] = useState(false);
  {
    mounted && <HydrationErrorElement />;
  }
  ```
