---
title:
date: '2019-06-18'
thumbnail:
lastUpdated: '2019-06-18'
description:
author: Christopher T.
tags:
  - javascript
  - react
  - breadcrumb
  - routing
category: composition
pageType: post
---

> src/index.js

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
```

> src/App.js

```jsx
import React from 'react'

const App = () => <div />

export default App
```

```jsx
// src/pages/home.js
import React from 'react'

const Home = ({ children }) => (
  <div>
    <h2>Home</h2>
    <div>{children}</div>
  </div>
)

export default Home

// src/pages/dashboard.js
import React from 'react'

const Dashboard = ({ children }) => (
  <div>
    <h2>Dashboard</h2>
    <div>{children}</div>
  </div>
)

export default Dashboard

// src/pages/contact.js
import React from 'react'

const Contact = ({ children }) => (
  <div>
    <h2>Contact</h2>
    <div>{children}</div>
  </div>
)

export default Contact

// src/pages/about.js
import React from 'react'

const About = ({ children }) => (
  <div>
    <h2>About</h2>
    <div>{children}</div>
  </div>
)

export default About

// src/pages/blog.js
import React from 'react'

const Blog = ({ children }) => (
  <div>
    <h2>Blog</h2>
    <div>{children}</div>
  </div>
)

export default Blog
```

> src/App.js

```jsx
import React from 'react'
import { Router } from '@reach/router'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Contact from './pages/contact'
import About from './pages/about'
import Blog from './pages/blog'

const App = () => (
  <div className='app'>
    <Router>
      <Home path='/' />
      <Dashboard path='/dashboard' />
      <Contact path='/contact' />
      <About path='/about' />
      <Blog path='/blog' />
    </Router>
  </div>
)

export default App
```

> src/styles.css

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.app {
  padding: 12px;
}

```

> src/Breadcrumb.js

```jsx
import React from 'react'

const Breadcrumb = ({ children }) => {
  return <div>{children}</div>
}

export default Breadcrumb
```

> src/App.js

```jsx
import React from 'react'
import { Link, Router } from '@reach/router'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Contact from './pages/contact'
import About from './pages/about'
import Blog from './pages/blog'
import Breadcrumb from './Breadcrumb'

const items = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
]

const App = () => (
  <div className='app'>
    <Breadcrumb>
      {items.map(({ to, label }) => (
        <Link key={to} to={to}>
          {label}
        </Link>
      ))}
    </Breadcrumb>
    <Router>
      <Home path='/' />
      <Dashboard path='/dashboard' />
      <Contact path='/contact' />
      <About path='/about' />
      <Blog path='/blog' />
    </Router>
  </div>
)

export default App
```

![1]()

> src/Breadcrumb.js

```jsx
const BreadcrumbItem = ({ children, ...props }) => (
  <li className='breadcrumb-item' {...props}>
    {children}
  </li>
)
```

```jsx
const Breadcrumb = (props) => {
  let children = React.Children.toArray(props.children)

  children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ))

  return <ol>{children}</ol>
}

export default Breadcrumb
```

```css
.separator {
  color: #333;
  margin: auto 6px;
  user-select: none;
}
```

```css
ol {
  list-style: none;
  display: flex;
  align-items: center;
}
```

https://reactjs.org/docs/react-api.html#reactchildren

Returns the children opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice this.props.children before passing it down.

![2]()

> src/Breadcrumb.js

```jsx
import React from 'react'

const BreadcrumbItem = ({ children, ...props }) => (
  <li className='breadcrumb-item' {...props}>
    {children}
  </li>
)

const BreadcrumbSeparator = (props) => <li className='separator' {...props} />

const Breadcrumb = (props) => {
  let children = React.Children.toArray(props.children)

  children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ))

  const lastIndex = children.length - 1

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex
    if (notLast) {
      acc.push(child, '/')
    } else {
      acc.push(child)
    }
    return acc
  }, [])

  return <ol>{children}</ol>
}

export default Breadcrumb
```

```jsx
const BreadcrumbSeparator = ({ children, ...props }) => (
  <li className='breadcrumb-separator' {...props}>
    {children}
  </li>
)
```

```jsx
children = children.reduce((acc, child, index) => {
  const notLast = index < lastIndex
  if (notLast) {
    acc.push(child, <BreadcrumbSeparator>/</BreadcrumbSeparator>)
  } else {
    acc.push(child)
  }
  return acc
}, [])
```

![3]()

> src/App.js

```jsx
const App = () => (
  <div className='app'>
    <Breadcrumb separator='/'>
      {items.map(({ to, label }) => (
        <Link key={to} to={to}>
          {label}
        </Link>
      ))}
    </Breadcrumb>
    <Router>
      <Home path='/' />
      <Dashboard path='/dashboard' />
      <Contact path='/contact' />
      <About path='/about' />
      <Blog path='/blog' />
    </Router>
  </div>
)
```

> src/Breadcrumb.js

```jsx
const Breadcrumb = ({ separator, ...props }) => {
  let children = React.Children.toArray(props.children)

  children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ))

  const lastIndex = children.length - 1

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex
    if (notLast) {
      acc.push(child, <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>)
    } else {
      acc.push(child)
    }
    return acc
  }, [])

  return <ol>{children}</ol>
}
```

> src/App.js

```jsx
const Separator = ({ children, ...props }) => (
  <span style={{ color: 'teal' }} {...props}>
    {children}
  </span>
)

const App = () => (
  <div className='app'>
    <Breadcrumb separator={<Separator>/</Separator>}>
      {items.map(({ to, label }) => (
        <Link key={to} to={to}>
          {label}
        </Link>
      ))}
    </Breadcrumb>
    <Router>
      <Home path='/' />
      <Dashboard path='/dashboard' />
      <Contact path='/contact' />
      <About path='/about' />
      <Blog path='/blog' />
    </Router>
  </div>
)
```

![4]()

![5 GIF clicking home>dashboard>contact>about>blog]()

next: FP

