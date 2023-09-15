import { useEffect } from 'react'
import { useLocation } from 'react-router'
import PropTypes from '@utils/PropTypes'

const ScrollToTop = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{children}</>
}

ScrollToTop.propTypes = {
  children: PropTypes.node
}

export default ScrollToTop
