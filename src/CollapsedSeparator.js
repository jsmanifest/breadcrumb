import React from 'react'
import styled from 'styled-components'
import { MdMoreHoriz } from 'react-icons/md'

const StyledCollapsedRoot = styled.li`
  display: flex;
`

const StyledMoreIcon = styled(MdMoreHoriz)`
  color: red;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 2px;
  width: 25px;
  height: 25px;
  &:hover,
  &:focus {
    background-color: salmon;
  }
  &:active {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`

const Collapsed = (props) => (
  <StyledCollapsedRoot {...props}>
    <StyledMoreIcon />
  </StyledCollapsedRoot>
)

export default Collapsed
