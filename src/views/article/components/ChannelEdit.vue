<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { channelAddApi, channelEditApi } from '@/api/article'

const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}

const open = (row) => {
  // console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
}
// 向外暴露方法
defineExpose({
  open
})

const emit = defineEmits(['success']) // 子传父，父组件重新调用获取数据的接口
const submit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await channelEditApi(formModel.value)
    ElMessage.success('编辑成功！')
  } else {
    await channelAddApi(formModel.value)
    ElMessage.success('添加成功！')
  }
  // 三元运算符写法
  // formModel.value.id
  //   ? await channelEditApi(formModel.value)
  //   : await channelAddApi(formModel.value)

  // ElMessage({
  //   type: 'success',
  //   message: formModel.value.id ? '编辑成功！' : '添加成功！'
  // })

  dialogVisible.value = false
  emit('success')
}
</script>
