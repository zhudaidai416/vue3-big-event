import { createRouter, createWebHistory } from 'vue-router'

// createRouter：创建路由实例
// 配置 history 模式
// history 模式：createWebHistory，hash 模式：createWebHashHistory

// vite 中的环境变量：import.meta.env.BASE_URL 就是 vite.config.js 中的 base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/',
      redirect: '/article/manage',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/channel',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        }
      ]
    }
  ]
})

export default router
