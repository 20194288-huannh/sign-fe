<template>
  <div class="main">
    <div class="flex">
      <img class="mr-3" width="55px" src="@/assets/img/send_sign.png" />
      <div class="flex flex-col items-start">
        <div class="font-bold">Verify Document</div>
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <a
                href="#"
                class="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Start Sign
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >Verify Document</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div>
      <StepCard
        :step="1"
        title="Add file"
        sub-title="What do you want to upload?"
        @some-event="showModal = true"
      >
        <template #header-icon>
          <el-icon color="#00b3b3" size="30" class="mr-5"><UploadFilled /></el-icon>
        </template>
        <template #main>
          <AddFile :files="files" @load-file="loadFile" />
        </template>
        <template #pdfViewer>
          <div class="relative w-full" @mouseleave="checkMouseMove = false">
            <div
              @mousemove="checkMouseMove = true"
              id="page-container-small"
              class="absolute right-[-160px] m-auto overflow-auto scale-[0.5] h-80 z-50 top-[-240px]"
            >
              <div id="viewer" class="pdfViewer"></div>
            </div>
            <div
              class="absolute top-[-170px] right-[30px] w-6 h-6 flex items-center justify-center z-50 bg-gray-200"
              v-show="files.length > 0 && checkMouseMove"
              @click="clearFile"
            >
              <el-icon><Close /></el-icon>
            </div>
          </div>
        </template>
      </StepCard>
    </div>
    <Success v-if="isVerified" :documents="documents" />
    <Error v-if="!isVerified && isVerified !== undefined" />
  </div>
  <EmailModal @get-user="getUser" v-model:show-modal="showModal"/>
</template>

<script setup lang="ts">
import StepCard from '../StepCard.vue'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import AddFile from '../MainStep/AddFile.vue'
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import { useKeyStore } from '@/stores/key'
import { useFileStore } from '@/stores/file'
import { useContractStore } from '@/stores/contract.ts'
import Success from '@/components/VerifyDocument/Success.vue'
import Error from '@/components/VerifyDocument/Error.vue'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'
import { storeToRefs } from 'pinia'
import { DocumentService, ActionService, UserService } from '@/services'
import EmailModal from '../EmailModal.vue'

const files = ref<Array<File>>([])
const checkMouseMove = ref<boolean>(false)
const pdf = ref()
const { importVerifyKey } = useKeyStore()
const {
  readFileAsArrayBuffer,
  bytesToArrayBuffer,
  convertBytesStringToBufferSource,
  arrayBufferToWordArray
} = useFileStore()
const verifyKey = ref<CryptoKey>()
const isShowDetail = ref<Boolean>(false)
const isVerified = ref<Boolean>()
const fileBuffer = ref<Array<any>>([])
const documents = ref<Array<any>>()
const showModal = ref<Boolean>(false)

const contractStore = useContractStore()
const { contractWithSigner, contract } = storeToRefs(contractStore)

let verifyK = `MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE+0vkr/der5sGbVb3ytGncU14RFxl7t/6G2gpeVb/1WC8WAtDPWfgBANw+Be3cJgq4ZR2OKoxnLnOvjNoxfQOq8O/sJZdebyAQaLCfmEz3A7LodMpD9C8GwkSs+4EeaaV`

const getUser = async (data: {email: string}) => {
  const response = await UserService.getUserByEmail(data)
  if (!response.data.data.public_key) {
    isVerified.value = false
  }
  verifyKey.value = await importVerifyKey(response.data.data.public_key)
  verify()
}

const verify = async () => {
  if (files.value.length < 1) {
    ElNotification({
      type: ENotificationType.ERROR,
      title: 'Error',
      message: 'Please upload a file'
    })
    return
  }

  if (!contractWithSigner.value) return
  const file = files.value[0]
  const buffer = await readFileAsArrayBuffer(file)
  const signedHex = CryptoJS.SHA256(arrayBufferToWordArray(buffer)).toString()
  const signedHash = ethers.utils.toUtf8Bytes(signedHex)
  try {
    const [uploader, originalHash, hashByPrivateKey, timestamp] =
      await contract.value.getDocument(signedHash)
    isVerified.value = await window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' }
      },
      verifyKey.value as CryptoKey,
      hexStringToUint8Array(hashByPrivateKey),
      buffer
    )
    if (isVerified.value) {
      fetchHistory(signedHex)
    }
  } catch (e) {
    isVerified.value = false
    console.log(e)
  }
}

const fetchHistory = async (sha: string) => {
  const response = await DocumentService.fetchHistory(sha)
  documents.value = response.data.data
}

const hexStringToUint8Array = (hexString: string) => {
  // Loại bỏ tiền tố "0x" nếu có
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2)
  }

  // Tạo Uint8Array với kích thước bằng một nửa độ dài của chuỗi hex
  let arrayBuffer = new Uint8Array(hexString.length / 2)

  // Chuyển đổi từng cặp ký tự hex thành giá trị số
  for (let i = 0; i < hexString.length; i += 2) {
    arrayBuffer[i / 2] = parseInt(hexString.substr(i, 2), 16)
  }

  return arrayBuffer
}

const clearFile = () => {
  files.value = []
}

const loadFile = (file: any) => {
  files.value = [file]
  const reader = new FileReader()

  reader.onload = () => {
    fileBuffer.value = reader.result
  }

  reader.readAsArrayBuffer(file)
}

const getPdf = async (id: number) => {
  let containerSmall = document.getElementById('page-container-small')
  let pdfViewerSmall = new PDFViewer({
    container: containerSmall
  })
  let loadingTask = pdfjsLib.getDocument(`http://localhost:8868/api/files/${id}`)
  pdf.value = await loadingTask.promise

  pdfViewerSmall.setDocument(pdf.value)
}
contractStore.initContract()
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
@/stores/contract
