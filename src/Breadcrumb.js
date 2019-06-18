import React from 'react'
import styled from 'styled-components'
import useBreadCrumb from './useBreadCrumb'
import CollapsedSeparator from './CollapsedSeparator'

const StyledRoot = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
`

const toStyledSeparator = (separator) => {
  const StyledSeparator = styled.span`
    color: #333;
    margin: auto 6px;
    user-select: none;
  `
  return <StyledSeparator>{separator}</StyledSeparator>
}

const toStyledItem = (child, index) => {
  const StyledBreadcrumbItem = styled.li`
    padding: 1px;
    display: flex;
    align-items: center;
  `
  return (
    <StyledBreadcrumbItem key={`breadcrumbItem${index}`}>
      {child}
    </StyledBreadcrumbItem>
  )
}

const toReducedItems = (lastIndex, separator) => (acc, currChild, index) => {
  const notLast = index < lastIndex
  if (notLast) acc.push(currChild, separator)
  else acc.push(currChild)
  return acc
}

const Breadcrumb = ({ children, collapse = {}, separator }) => {
  let items = React.Children.toArray(children)

  const { expanded, open } = useBreadCrumb()

  const { itemsBefore = 1, itemsAfter = 1, max = 4 } = collapse

  const totalItems = items.length
  const lastIndex = totalItems - 1

  items = items
    .filter(React.isValidElement)
    .map(toStyledItem)
    .reduce(toReducedItems(lastIndex, toStyledSeparator(separator)), [])

  if (!expanded || totalItems > max) {
    items = [
      ...items.slice(0, itemsBefore),
      <CollapsedSeparator onClick={open} />,
      ...items.slice(totalItems - itemsAfter, totalItems),
    ]
  }

  return <StyledRoot>{items}</StyledRoot>
}

export default Breadcrumb
