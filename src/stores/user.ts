import { ref } from 'vue'
import { defineStore } from 'pinia'

interface User {
  id: Number
  name: string
  email: string
  address_wallet: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>(JSON.parse(localStorage.getItem('user') as string))
  const token = ref<string | null>(localStorage.getItem('token'))

  return { user, token }
})
