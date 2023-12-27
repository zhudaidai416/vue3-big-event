import http from '@/utils/request'

// 注册
export const userRegister = (data) => {
  return http.post('/api/reg', data)
}

// 登录
export const userLogin = (data) => {
  return http.post('/api/login', data)
}
