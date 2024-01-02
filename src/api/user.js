import http from '@/utils/request'

// 注册
export const userRegister = (data) => {
  return http.post('/api/reg', data)
}

// 登录
export const userLogin = (data) => {
  return http.post('/api/login', data)
}

// 用户基本信息
export const userInfo = () => {
  return http.get('/my/userinfo')
}
