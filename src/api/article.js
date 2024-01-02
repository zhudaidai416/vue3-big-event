import http from '@/utils/request'

// 文章分类列表
export const articleChannels = () => {
  return http.get('/my/cate/list')
}

// 添加
export const articleAddChannel = (data) => {
  return http.post('/my/cate/add', data)
}

// 编辑
export const articleEditChannel = (data) => {
  return http.put('/my/cate/info', data)
}

// 删除
export const articleDelChannel = (id) => {
  return http.delete('/my/cate/del', { params: { id } })
}
