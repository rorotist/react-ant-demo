import { useContext } from 'react'
import AuthContext from '@services/AuthContext'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
