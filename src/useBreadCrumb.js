import { useState } from 'react'

const useBreadCrumb = () => {
  const [expanded, setExpanded] = useState(false)

  const open = () => setExpanded(true)

  return {
    expanded,
    open,
  }
}

export default useBreadCrumb
