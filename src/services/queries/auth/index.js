import { apiSetLogin } from '@services/api/auth'
import axiosPublic from '@services/axios/axiosPublic'
import { useMutation } from '@tanstack/react-query'

export const useTestSetLogin = ({ ...options }) => {
  return useMutation({
    mutationFn: data => {
      const mutateData = {
        email: data.loginId,
        password: data.password
      }
      return axiosPublic({
        method: 'POST',
        url: '/login',
        data: mutateData
      })
    },
    ...options
  })
}

export const useSetLogin = ({ ...options }) => {
  return useMutation({
    mutationFn: data => {
      return apiSetLogin(data)
    },
    ...options
  })
}
