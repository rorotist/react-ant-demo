import { useState, createContext } from 'react'

import PropTypes from 'prop-types'

export const LayoutContext = createContext(null)

const LayoutProvider = props => {
  const [sideCollapsed, setSideCollapsed] = useState(false)
  const [mobileSideOpen, setMobileSideOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState('')

  const value = {
    sideCollapsed,
    setSideCollapsed,
    mobileSideOpen,
    setMobileSideOpen,
    /* 페이지 타이틀 */
    pageTitle,
    setPageTitle
  }

  return (
    <LayoutContext.Provider value={value}>
      {props.children}
    </LayoutContext.Provider>
  )
}

LayoutProvider.propTypes = {
  children: PropTypes.node
}

export default LayoutProvider
