<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="formModel"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input
              v-model="formModel.old_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              v-model="formModel.new_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input
              v-model="formModel.re_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userPwdApi } from '@/api/user'
import { useRouter } from 'vue-router'

const formRef = ref()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkOldSame = (rule, value, callback) => {
  if (value === formModel.value.old_pwd) {
    callback(new Error('原密码和新密码不能一致！'))
  } else {
    callback()
  }
}
const checkNewSame = (rule, value, callback) => {
  if (value !== formModel.value.new_pwd) {
    callback(new Error('两次输入的密码不一致！'))
  } else {
    callback()
  }
}
const rules = {
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}

// 提交
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  await formRef.value.validate()
  await userPwdApi(formModel.value)
  ElMessage.success('密码修改成功！')

  // 密码修改后，重新登录，需清空本地存储的 token 和用户信息
  userStore.setToken('')
  userStore.setUser({})
  // 拦截登录
  router.push('/login')
}
// 重置表单
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
