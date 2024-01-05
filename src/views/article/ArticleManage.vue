<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </template>
    <!-- 搜索 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- Vue2 中的 v-model => :value 和 @input 的简写 -->
        <!-- Vue3 中的 v-model => :modelValue 和 @update:modelValue 的简写 -->
        <!-- <channel-select v-model:modelValue="parmas.cate_id"></channel-select> -->

        <!-- Vue3 中的 v-model:cid => :cid 和 @update:cid 的简写 -->
        <!-- <channel-select v-model:cid="parmas.cate_id"></channel-select> -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchArticle">搜索</el-button>
        <el-button @click="resetArticle">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList" border v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="'false'">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="editArticle(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="delArticle(row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 抽屉弹窗 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { articleListApi, articleDelApi } from '@/api/article'
import { formatTime } from '@/utils/format'

// 请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 3,
  cate_id: '',
  state: ''
})
const loading = ref(false) // loading 效果
const articleList = ref([])
const total = ref(0)

const getArticleList = async () => {
  loading.value = true
  const res = await articleListApi(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

onMounted(() => {
  getArticleList()
})

// 分页
const handleSizeChange = (size) => {
  // console.log('每页条数', size)
  // 只要条数变化，访问的当前页意义不大（可能不存在），从第一页开始渲染
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticleList()
}
const handleCurrentChange = (page) => {
  // console.log('当前页码', page)
  params.value.pagenum = page
  getArticleList()
}
// 搜索
const searchArticle = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const resetArticle = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 添加
const articleEditRef = ref()
const addArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const editArticle = (row) => {
  articleEditRef.value.open(row)
}
// 添加或编辑成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最后一页再渲染
    params.value.pagenum = lastPage
  }
  getArticleList()
}
// 删除
const delArticle = async (row) => {
  await ElMessageBox.confirm('确认要删除该文章吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await articleDelApi(row.id)
  ElMessage.success('删除成功！')
  getArticleList()
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
