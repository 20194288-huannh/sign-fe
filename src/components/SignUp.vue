<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <div class="flex items-center">
          <img src="/Logo2.png" class="logo w-auto h-16 mr-2" />
          <span class="ml-2 font-semibold text-[#38BDF8] text-lg">Signature</span>
        </div>
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
                  required="true"
                  class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                >Name</label
              >
              <div class="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  v-model="form.name"
                  autocomplete="name"
                  required="true"
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
                  required="true"
                  class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  required="true"
                  v-model="form.password_confirmation"
                  class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="flex items-start">
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                @click.prevent="download"
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
            <WalletConnect v-model:addressWallet="form.wallet_address" />
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required="true"
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
import { ref, reactive } from 'vue'
import { AuthService } from '@/services'
import { ethers } from 'ethers'
import { useContractStore } from '@/stores/contract'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import WalletConnect from './WalletConnect.vue'

const router = useRouter()
const route = useRoute()

interface User {
  email: string
  name: string
  password: string
  password_confirmation: string
  wallet_address: string | null
  public_key: string
  private_key: string
}
const form = ref<User>({
  email: (route.query.email as string) || '',
  name: '',
  password: '',
  password_confirmation: '',
  wallet_address: localStorage.getItem('walletAddress') || '',
  public_key: '',
  private_key: ''
})

const ecryptKeyRef = ref<string>('')
const signKeyRef = ref<string>('')
const contractStore = useContractStore()
const { contract, contractWithSigner } = storeToRefs(contractStore)

contractStore.initContract()

const signUp = async () => {
  try {
    if (!contractWithSigner.value) return
    const verifyKeyBytes = ethers.utils.toUtf8Bytes(form.value.public_key)

    const response = await AuthService.signUp(form.value)
    await contractWithSigner.value.createUser('0x1234', verifyKeyBytes, form.value.email)

    if (route.query.token) {
      router.push({ name: 'ViewSignedDocument', query: { token: route.query.token } })
    } else {
      router.push({ name: 'Home' })
    }
    // const data = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const download = async () => {
  // Tạo cặp khóa công khai và khóa riêng tư
  await generateKeyPair()

  const pemExported = `-----BEGIN PRIVATE KEY-----\n${form.value.private_key}\n-----END PRIVATE KEY-----`
  const blob = new Blob([pemExported], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'sign-key.txt'
  link.click()
  URL.revokeObjectURL(link.href)
}

const generateKeyPair = async () => {
  let keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-384'
    },
    true,
    ['sign', 'verify']
  )
  // Chuyển đổi khóa sang định dạng chuỗi hex\
  let exported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
  form.value.private_key = await keyToString(exported) // sign key
  exported = await crypto.subtle.exportKey('spki', keyPair.publicKey)
  form.value.public_key = await keyToString(exported) // verify key
  console.log(form.value.private_key)
  console.log(form.value.public_key)
}

const keyToString = async (exported: any): Promise<string> => {
  // const exported = await crypto.subtle.exportKey('spki', key)
  // console.log(exported)
  const exportedAsString = ab2str(exported)
  return window.btoa(exportedAsString)
}

const ab2str = (buf: any) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}
</script>

<style lang="scss" scoped></style>
