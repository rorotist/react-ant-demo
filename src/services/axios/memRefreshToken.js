// @/src/common/refreshToken.js
import { AUTH } from '@constants/auth'
import mem from 'mem'

import axiosPrivate from '.'

const refreshTokenFn = async () => {
  const { accessToken, refreshToken, loginId } = JSON.parse(
    localStorage.getItem(AUTH.인증정보)
  )

  try {
    const response = await axiosPrivate({
      method: 'POST',
      url: '/api/admin/auth/refresh',
      data: {
        loginId,
        refreshToken
      }
    })
    // 후에 이름 변경
    const authInfo = response.data.data

    if (accessToken) {
      localStorage.removeItem(AUTH.인증정보)
    }

    localStorage.setItem(AUTH.인증정보, JSON.stringify(authInfo))

    return authInfo
  } catch (error) {
    localStorage.removeItem(AUTH.인증정보)
  }
}

const maxAge = 10_000

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge
})
