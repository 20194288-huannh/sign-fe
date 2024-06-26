<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-16 w-auto" src="/Logo2.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="signIn">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="form.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <WalletConnect v-model:addressWallet="form.wallet_address" />
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <router-link
          to="/sign-up"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '@/services'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import WalletConnect from './WalletConnect.vue'

const form = ref<{ email: string; password: string; wallet_address: string }>({
  email: '',
  password: '',
  // wallet_address: ''
  wallet_address: localStorage.getItem('walletAddress') || ''
})

const userStore = useUserStore()
const { user, token } = storeToRefs(userStore)

const router = useRouter()
const route = useRoute()

const signIn = async () => {
  const response = await AuthService.signIn(form.value)
  token.value = response.data.data.access_token
  user.value = response.data.data.user
  localStorage.setItem('token', token.value)
  localStorage.setItem('user', JSON.stringify(user.value))
  if (route.query.token) {
    router.push({ name: 'ViewSignedDocument', query: { token: route.query.token } })
  } else {
    router.push({ name: 'Home' })
  }
}

const setup = () => {
  if (route.query.token) {
    form.value.email = (route.query.email as string) || ''
  }
}
setup()
</script>

<style lang="scss" scoped></style>
