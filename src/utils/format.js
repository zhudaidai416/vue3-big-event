import { dayjs } from 'element-plus'
import axios from 'axios'

// 日期格式转换
export const formatTime = (time) => dayjs(time).format('YYYY-MM-DD')

// 将网络图片地址转换为 File 对象
export async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用 axios 获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为 Blob 对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的 File 对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
// 示例使用
// const imageUrl = 'https://example.com/path/to/image.jpg'
// const filename = 'image.jpg'
// imageUrlToFile(imageUrl, filename).then((file) => {
//   if (file) {
//     console.log('转换成功')
//   } else {
//     console.log('转换失败')
//   }
// })
