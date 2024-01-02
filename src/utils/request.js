import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 2000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (res.data.code === 0) {
      return res
    }

    // 处理业务失败，给错误提示，抛出错误
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 错误的特殊情况：401权限不足或token过期 => 拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // console.log(err)
    // 错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
