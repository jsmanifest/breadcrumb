import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import useBreadcrumb from './useBreadcrumb'
import BreadcrumbCollapser from './BreadcrumbCollapser'

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

const toBreadcrumbItem = (child, index) => (
  <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
)

const withSeparator = (lastIndex, separator) => (acc, child, index) => {
  const notLast = index < lastIndex
  if (notLast) {
    acc.push([
      child,
      <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
        <MdKeyboardArrowRight />
      </BreadcrumbSeparator>,
    ])
  } else {
    acc.push(child)
  }
  return acc
}

const withCollapse = ({
  itemsBefore,
  itemsAfter,
  max,
  children,
  totalItems,
  open,
}) => [
  ...children.slice(0, itemsBefore),
  <BreadcrumbCollapser
    title='Expand'
    key='collapsed-seperator'
    onClick={open}
  />,
  ...children.slice(totalItems - itemsAfter, totalItems),
]

const Breadcrumb = ({ separator, collapse = {}, ...props }) => {
  let children = React.Children.toArray(props.children)

  const { expanded, open } = useBreadcrumb()

  const { itemsBefore = 1, itemsAfter = 1, max = 4 } = collapse

  const totalItems = children.length
  const lastIndex = totalItems - 1

  children = children
    .map(toBreadcrumbItem)
    .reduce(withSeparator(lastIndex, separator), [])

  if (!expanded || totalItems <= max) {
    children = withCollapse({
      itemsBefore,
      itemsAfter,
      max,
      children,
      totalItems,
      open,
    })
  }

  return <ol>{children}</ol>
}

export default Breadcrumb
