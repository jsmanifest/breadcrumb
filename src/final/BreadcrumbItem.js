import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'

const StyledBreadcrumbItem = styled.li`
  padding: 1px;
  display: flex;
  align-items: center;
`

const StyledIcon = (Icon) => styled(Icon)`
  color: #000;
  opacity: 0.75;
  margin-right: 5px;
`

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

const StyledSeparator = styled.li`
  color: #333;
  margin: auto 8px;
  user-select: none;
`

const BreadcrumbItem = ({
  children,
  Icon,
  total,
  separator,
  to,
  index,
  ...rest
}) => {
  const ListItem = (props) => <li {...props} />
  const Separator = typeof separator === 'string' ? StyledSeparator : ListItem
  const isLast = index < total
  const BreadcrumbIcon = Icon ? StyledIcon(Icon) : null
  return (
    <StyledBreadcrumbItem {...rest}>
      {Icon && <BreadcrumbIcon />}
      <StyledLink to={to}>{children}</StyledLink>
      {isLast && <Separator>{separator}</Separator>}
    </StyledBreadcrumbItem>
  )
}
export default BreadcrumbItem
