---
title: 'React Router'
---

## Basic

```jsx
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom'

const Home = () => <h2>Home Page</h2>
const NotFound = () => <h2>Page Not Found</h2>

function Services() {
  return (
    <div>
      <h2>Services Page</h2>
      <Link to="A">Service A</Link>
      <Link to="B">Service B</Link>
      <Outlet />
    </div>
  )
}

function ServiceDetail() {
  let { serviceId } = useParams()
  return <h3>Service {serviceId}</h3>
}

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />}>
          <Route index element={<h3>Choose a service</h3>} />
          <Route path=":serviceId" element={<ServiceDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
```

[![Edit React Router 6 Outlet playground (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-router-6-outlet-playground-forked-5f6kqk?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)
