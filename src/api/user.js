import http from '@/utils/request'

// 注册
export const userRegisterApi = (data) => {
  return http.post('/api/reg', data)
}

// 登录
export const userLoginApi = (data) => {
  return http.post('/api/login', data)
}

// 用户基本信息
export const userInfoApi = () => {
  return http.get('/my/userinfo')
}
