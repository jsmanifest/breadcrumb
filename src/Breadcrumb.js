import React from 'react'

const BreadcrumbItem = ({ children, ...props }) => (
  <li className='breadcrumb-item' {...props}>
    {children}
  </li>
)

const BreadcrumbSeparator = ({ children, ...props }) => (
  <li className='breadcrumb-separator' {...props}>
    {children}
  </li>
)

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

export default Breadcrumb
