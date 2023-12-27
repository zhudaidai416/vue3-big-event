// pinia 独立维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from '@/stores/modules/user'
// export { useUserStore }

// 等同于
export * from '@/stores/modules/user'
