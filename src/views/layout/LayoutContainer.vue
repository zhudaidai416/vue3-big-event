<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <aside-menu />
    </el-aside>
    <el-container>
      <el-header>
        <header-menu />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2024 Created by 朱呆呆</el-footer>
    </el-container>
  </el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;
  }

  .el-header {
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
