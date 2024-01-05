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

// 更新用户基本信息
export const userInfoUpdateApi = (data) => {
  return http.put('/my/userinfo', data)
}

// 更新用户头像
export const userAvatarApi = (avatar) => {
  return http.patch('/my/update/avatar', { avatar })
}

// 更新用户密码
export const userPwdApi = (data) => {
  return http.patch('/my/updatepwd', data)
}
