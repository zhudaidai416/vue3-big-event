<template>
  <div>
    黑马程序员：<strong>{{
      userStore.user.nickname || userStore.user.username
    }}</strong>
  </div>
  <div class="header-right">
    <el-color-picker size="small" v-model="color" @change="setThemeColor" />
    <el-switch
      v-model="dark"
      size="small"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
      @change="setDarkTheme"
    />
    <el-dropdown placement="bottom-end" @command="handleCommand">
      <span class="el-dropdown__box">
        <el-avatar :src="userStore.user.user_pic || avatar" />
        <el-icon>
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile" :icon="User"
            >基本资料</el-dropdown-item
          >
          <el-dropdown-item command="avatar" :icon="Crop"
            >更换头像</el-dropdown-item
          >
          <el-dropdown-item command="password" :icon="EditPen"
            >重置密码</el-dropdown-item
          >
          <el-dropdown-item command="logout" :icon="SwitchButton"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import {
  Sunny,
  Moon,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

const router = useRouter()
const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('确认要退出吗？', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // 清空本地数据（token + user信息）
    userStore.removeToken()
    userStore.setUser({})
    router.push('/login')
  } else {
    router.push(`/user/${key}`)
  }
}
// 主题颜色
const color = ref('#79BBFF')
const setThemeColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
// 暗黑模式
const dark = ref(false)
const setDarkTheme = () => {
  const html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;

  ::v-deep .el-color-picker,
  .el-switch {
    margin-right: 15px;
  }
  .el-dropdown__box {
    display: flex;
    align-items: center;

    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>
