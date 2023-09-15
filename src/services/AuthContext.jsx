import { createContext, useEffect, useState } from 'react'

import { notification } from 'antd'

import { AUTH } from '@constants/auth'
import { useSetLogin } from '@queries/auth'

import PropTypes from '@utils/PropTypes'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const authInfo = JSON.parse(localStorage.getItem(AUTH.인증정보))
  const [auth, setAuth] = useState(authInfo)
  const [api, contextHolder] = notification.useNotification()

  const { mutateAsync: loginMutate, isLoading: isLoginLoading } = useSetLogin({
    onSuccess: async ({ data }) => {
      setAuth(data.data)
      api.info({
        message: `로그인 성공`,
        description: '😬',
        placement: 'bottomRight'
      })
    },
    onError: error => {
      const errorMessage = error?.response?.data?.resultMsg
      api.error({
        message: `로그인`,
        description: errorMessage ?? '로그인 에러',
        placement: 'bottomRight'
      })
    }
  })

  const onLogin = async data => {
    await loginMutate(data)
  }
  const onLogOut = () => {
    localStorage.removeItem(AUTH.인증정보, null)
    setAuth(null)
  }

  useEffect(() => {
    localStorage.setItem(AUTH.인증정보, JSON.stringify(auth))
  }, [auth])

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, onLogin, onLogOut, isLoginLoading }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthContext
