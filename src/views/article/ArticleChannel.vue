<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <el-table
      v-loading="loading"
      :data="channelList"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="editChannel(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="delChannel(row)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { channelListApi, channelDelApi } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await channelListApi()
  channelList.value = res.data.data
  loading.value = false
}

onMounted(() => {
  getChannelList()
})

// 添加
const addChannel = () => {
  dialog.value.open({})
}
// 编辑
const editChannel = (row) => {
  dialog.value.open(row)
}
const onSuccess = () => {
  getChannelList()
}
// 删除
const delChannel = async (row) => {
  await ElMessageBox.confirm('确认要删除该分类吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await channelDelApi(row.id)
  ElMessage.success('删除成功！')
  getChannelList()
}
</script>

<style lang="scss" scoped></style>
