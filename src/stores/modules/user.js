import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userInfo } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userInfo()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }

    return { token, setToken, removeToken, user, getUser, setUser }
  },
  {
    persist: true
  }
)
