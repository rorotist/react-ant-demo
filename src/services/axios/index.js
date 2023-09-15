import { AUTH } from '@constants/auth'
import axios from 'axios'

import { memoizedRefreshToken } from './memRefreshToken'

const AxiosConfigure = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30_000,
  withCredentials: true
}

const axiosPrivate = axios.create(AxiosConfigure)

axiosPrivate.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem(AUTH.인증정보)
    const session = JSON.parse(accessToken)

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.accessToken}`
      }
    }

    return config
  },
  error => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true

      const result = await memoizedRefreshToken()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`
        }
      }

      return axios(config)
    }
    return Promise.reject(error)
  }
)

export default axiosPrivate
