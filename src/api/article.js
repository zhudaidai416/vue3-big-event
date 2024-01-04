import http from '@/utils/request'

// ========================== 文章分类 ==========================
// 文章分类列表
export const channelListApi = () => {
  return http.get('/my/cate/list')
}
// 添加
export const channelAddApi = (data) => {
  return http.post('/my/cate/add', data)
}
// 编辑
export const channelEditApi = (data) => {
  return http.put('/my/cate/info', data)
}
// 删除
export const channelDelApi = (id) => {
  return http.delete('/my/cate/del', { params: { id } })
}

// ========================== 文章管理 ==========================
// 文章列表
export const articleListApi = (params) => {
  return http.get('/my/article/list', { params })
}
// 添加
export const articleAddApi = (data) => {
  return http.post('/my/article/add', data)
}
// 文章详情
export const articleDetailApi = (id) => {
  return http.get('/my/article/info', { params: { id } })
}
// 编辑
export const articleEditApi = (data) => {
  return http.put('/my/article/info', data)
}
// 删除
export const articleDelApi = (id) => {
  return http.delete('/my/article/info', { params: { id } })
}
