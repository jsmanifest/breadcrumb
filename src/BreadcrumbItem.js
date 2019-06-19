import React from 'react'

const BreadcrumbItem = ({ children, ...props }) => (
  <li className='breadcrumb-item' {...props}>
    {children}
  </li>
)

export default BreadcrumbItem
