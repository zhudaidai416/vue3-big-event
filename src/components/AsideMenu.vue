<template>
  <div class="logo"></div>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#232323"
    :default-active="$route.path"
    text-color="#fff"
    router
  >
    <el-menu-item index="/article/channel">
      <el-icon>
        <Management />
      </el-icon>
      <span>文章分类</span>
    </el-menu-item>
    <el-menu-item index="/article/manage">
      <el-icon>
        <Promotion />
      </el-icon>
      <span>文章管理</span>
    </el-menu-item>
    <el-sub-menu index="/user">
      <template #title>
        <el-icon>
          <UserFilled />
        </el-icon>
        <span>个人中心</span>
      </template>
      <el-menu-item index="/user/profile">
        <el-icon>
          <User />
        </el-icon>
        <span>基本资料</span>
      </el-menu-item>
      <el-menu-item index="/user/avatar">
        <el-icon>
          <Crop />
        </el-icon>
        <span>更换头像</span>
      </el-menu-item>
      <el-menu-item index="/user/password">
        <el-icon>
          <EditPen />
        </el-icon>
        <span>重置密码</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen
} from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.logo {
  height: 120px;
  background: url('@/assets/logo.png') no-repeat center / 120px auto;
}

.el-menu {
  border-right: none;
}
</style>
