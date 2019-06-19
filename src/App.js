import React from 'react'
import { Link, Router } from '@reach/router'
import { MdHome, MdSettings, MdEmail, MdInfo, MdWeb } from 'react-icons/md'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Contact from './pages/contact'
import About from './pages/about'
import Blog from './pages/blog'
import Breadcrumb from './Breadcrumb'

const Separator = ({ children, ...props }) => (
  <span style={{ color: 'teal' }} {...props}>
    {children}
  </span>
)

const options = {
  icons: {
    Home: MdHome,
    Dashboard: MdSettings,
    Contact: MdEmail,
    About: MdInfo,
    Blog: MdWeb,
  },
  items: [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ],
}

const App = () => (
  <div className='app'>
    <Breadcrumb separator={<Separator>/</Separator>}>
      {options.items.map(({ to, label }) => {
        const Icon = options.icons[label]
        return (
          <div key={to} className='some-custom-classname'>
            {Icon && <Icon />}
            <Link to={to}>{label}</Link>
          </div>
        )
      })}
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
