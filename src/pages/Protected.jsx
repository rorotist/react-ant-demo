import { Navigate, useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import useAuth from '@hooks/useAuth'

const Protected = ({ children }) => {
  const location = useLocation()
  const { auth } = useAuth()

  if (!auth || auth === undefined) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}
export default Protected

Protected.propTypes = {
  children: PropTypes.node
}
