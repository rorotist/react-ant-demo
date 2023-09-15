// get ,set ,update, delete

import axiosPublic from '@services/axios/axiosPublic'

// 로그인
const apiSetLogin = data => {
  return axiosPublic({
    method: 'POST',
    url: '/api/admin/auth/login',
    data
  })
}

export { apiSetLogin }
