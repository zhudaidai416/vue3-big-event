<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="formModel"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="formModel.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="formModel.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userInfoUpdateApi } from '@/api/user'

// 使用仓库中数据的初始值（无需响应式），解构无问题
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()
const formModel = ref({ username, nickname, email, id })
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
const formRef = ref()

// 提交
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userInfoUpdateApi(formModel.value)
    await getUser()
    ElMessage.success('修改成功！')
  }
}
</script>
