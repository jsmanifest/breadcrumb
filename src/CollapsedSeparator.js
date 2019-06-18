import React from 'react'
import styled from 'styled-components'
import { MdMoreHoriz } from 'react-icons/md'

const StyledCollapsedRoot = styled.li`
  display: flex;
`

const StyledMoreIcon = styled(MdMoreHoriz)`
  cursor: pointer;
  transition: all 0.2s ease-out;
  color: #000;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 2px;
  width: 25px;
  height: 25px;
  &:hover,
  &:focus {
    color: #999;
    transform: scale(1.15);
  }
  &:active {
    color: #333;
  }
`

const Collapsed = (props) => (
  <StyledCollapsedRoot {...props}>
    <StyledMoreIcon />
  </StyledCollapsedRoot>
)

export default Collapsed
