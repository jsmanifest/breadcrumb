import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Router } from '@reach/router'
import styled from 'styled-components'
import { MdHome, MdSettings, MdEmail } from 'react-icons/md'
import Breadcrumb from './Breadcrumb'
import Dashboard from './Dashboard'
import Contact from './Contact'
import './index.css'
import * as serviceWorker from './serviceWorker'

const StyledLink = styled(Link)`
  transition: all 0.1s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #fc9208;
  }
`

const toStyledIcon = (Icon) => styled(Icon)`
  color: #000;
  opacity: 0.75;
  margin-right: 3px;
`

const options = {
  icons: {
    Home: MdHome,
    Dashboard: MdSettings,
    Contact: MdEmail,
  },
  items: [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ],
}

ReactDOM.render(
  <>
    <Breadcrumb icons={options.icons} separator='/'>
      {options.items.map(({ to, label }) => {
        let StyledIcon
        const Icon = options.icons[label]
        if (Icon) StyledIcon = toStyledIcon(options.icons[label])
        return (
          <div key={to}>
            {Icon && <StyledIcon />}
            <StyledLink to={to}>{label}</StyledLink>
          </div>
        )
      })}
    </Breadcrumb>
    <Router>
      <Dashboard path='/dashboard' />
      <Contact path='/contact' />
    </Router>
  </>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
