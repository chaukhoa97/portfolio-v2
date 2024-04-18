---
title: 'React Router'
---

## (Old) Using `<BrowserRouter>`

```jsx title=main.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
} from 'react-router-dom'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

function Services() {
  return (
    <div>
      <h1>Services Page</h1>
      <Link to="A">Service A</Link>
      <Link to="B">Service B</Link>
      <Outlet />
    </div>
  )
}

function ServiceDetail() {
  let { serviceId } = useParams()
  return <h1>Service {serviceId}</h1>
}

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/services" element={<Services />}>
          <Route index element={<h1>Choose a service</h1>} />
          <Route path=":serviceId" element={<ServiceDetail />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
```

## (New) Using `createBrowserRouter`

```jsx
import {
  createBrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/courses',
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: '/courses/:id', element: <Course /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
```

[![Edit React Router 6 Outlet playground (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-router-6-outlet-playground-forked-5f6kqk?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark)
