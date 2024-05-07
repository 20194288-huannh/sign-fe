<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="signUp">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="form.email"
                  autocomplete="email"
                  required=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model="form.password"
                  autocomplete="current-password"
                  required=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="confirm-password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
              <div class="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="current-password"
                  required=""
                  v-model="form.password_confirmation"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="flex items-start">
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                @click="download"
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
              </button>
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300"
                  >I accept the
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link
                to="/sign-in"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Login here</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AuthService } from '@/services'
import axios from 'axios'

interface User {
  email: string
  password: string
  password_confirmation: string
  wallet_address: string | null
}
const form = ref<User>({
  email: '',
  password: '',
  password_confirmation: '',
  wallet_address: localStorage.getItem('walletAddress')
})

const signUp = async () => {
  const response = await AuthService.signUp(form.value)
}

const download = async () => {
  // Tạo cặp khóa công khai và khóa riêng tư
  const { publicKey, privateKey } = await generateKeyPair()

  // Lưu public key vào state của Vue
  // this.publicKey = publicKey

  // Gửi public key lên blockchain
  // await this.registerPublicKey(publicKey)

  console.log(publicKey)
  // const keyPair = await crypto.subtle.generateKey(
  //   {
  //     name: 'RSA-OAEP',
  //     modulusLength: 4096,
  //     publicExponent: new Uint8Array([1, 0, 1]),
  //     hash: 'SHA-256'
  //   },
  //   true,
  //   ['encrypt', 'decrypt']
  // )
  // const publicKey = await crypto.subtle.exportKey('jwk', keyPair.publicKey)

  // const blob = new Blob([JSON.stringify(publicKey)], { type: 'application/pdf' })
  // const link = document.createElement('a')
  // link.href = URL.createObjectURL(blob)
  // link.download = '123.txt'
  // link.click()
  // URL.revokeObjectURL(link.href)

  // const privateKey = await crypto.subtle.exportKey('jwk', keyPair.privateKey)
}

const generateKeyPair = async () => {
  // Tạo một cặp khóa mới
  const { privateKey, publicKey } = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-256' }
    },
    true,
    ['encrypt', 'decrypt']
  )

  // Chuyển đổi khóa sang định dạng chuỗi hex
  const privateKeyHex = JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey))
  const publicKeyHex = JSON.stringify(await crypto.subtle.exportKey('jwk', publicKey))

  const blob = new Blob([JSON.stringify(privateKeyHex)], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'private-key.txt'
  link.click()
  URL.revokeObjectURL(link.href)

  return { publicKey: publicKeyHex, privateKey: privateKeyHex }
}
</script>

<style lang="scss" scoped></style>
