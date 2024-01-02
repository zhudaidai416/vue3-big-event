<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <aside-menu />
    </el-aside>
    <el-container>
      <el-header>
        <div>
          黑马程序员：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
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
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2024 Created by 朱呆呆</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import {
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
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
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

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

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
