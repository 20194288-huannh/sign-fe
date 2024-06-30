<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
// @ts-ignore
import pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/web/pdf_viewer.css'
import { RequestService } from '@/services/index.js'
import { useRoute, useRouter } from 'vue-router'
import type { Receiver, Signature, Canvas } from '@/types/send-sign'
import type { Document } from '@/types/document.interface'
import { DocumentService } from '@/services/index.js'
import { ethers } from 'ethers'
import { useKeyStore } from '@/stores/key'
import { useFileStore } from '@/stores/file'
import { useContractStore } from '@/stores/contract'
import { storeToRefs } from 'pinia'
// @ts-ignore
import CryptoJS from 'crypto-js'
import UploadPrivateKey from '@/components/UploadPrivateKey.vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

interface RequestData {
  signatures: Signature[]
  users: Receiver[]
  document: Document
  canvas: Canvas
  token: string
}

const route = useRoute()
const router = useRouter()
const pdf = ref<any>()
const requestData = ref<RequestData>()
const status = ref<number>()
const email = ref<string>()
const { arrayBufferToWordArray } = useFileStore()
const contractStore = useContractStore()
const { contractWithSigner, contract } = storeToRefs(contractStore)
const { key, compareArrayBuffers, importVerifyKey, importSignKey } = useKeyStore()
const showModal = ref<Boolean>(false)
const privateKey = ref<string>(
  'MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDCpGhexCSi6kHmCjllsvmsll43wnBS1SBrqn9yj0VWHg7HMpjcD3m+kxtDRB2iQBiahZANiAAT7S+Sv916vmwZtVvfK0adxTXhEXGXu3/obaCl5Vv/VYLxYC0M9Z+AEA3D4F7dwmCrhlHY4qjGcuc6+M2jF9A6rw7+wll15vIBBosJ+YTPcDsuh0ykP0LwbCRKz7gR5ppU='
)

const baseDomain = import.meta.env.VITE_APP_BASE_URL
const fetchDocument = async (id: Number) => {
  let loadingTask = pdfjsLib.getDocument(`${baseDomain}files/${id}`)
  pdf.value = await loadingTask.promise
}
const fetchRequest = async () => {
  try {
    const response = await RequestService.get(route.query.token as string)
    requestData.value = response.data.data
  } catch (e: any) {
    status.value = e.status
    email.value = e.data.data.email
    if (e.status === 403) {
      // router.push({ name: 'signUp', query: { token: route.query.token } })
    }
  }
}

const createFileFromPDF = (pdfData: any, filename: string) => {
  const blob = new Blob([pdfData], { type: 'application/pdf' })

  const file = new File([blob], filename, { lastModified: Date.now() })
  return file
}

const download = async (pdfData: any, filename: string) => {
  const blob = new Blob([pdfData], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
  return blob
}

const onFinish = () => {
  showModal.value = true
}

const submit = async (key: string) => {
  privateKey.value = key
  if (requestData.value) {
    requestData.value.token = route.query.token as string
    const response = await DocumentService.sign(requestData.value?.document.id, requestData.value)

    let signedPdf = createFileFromPDF(response.data, 'signed-' + '123')
    download(response.data, 'signed-' + '123')

    // let signedPdf = createFileFromPDF(response.data, 'signed-' + file.name)
    // download(response.data, 'signed-' + file.name)
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const buffer = await blob.arrayBuffer()
    if (buffer) {
      const signedHash = ethers.utils.toUtf8Bytes(
        CryptoJS.SHA256(arrayBufferToWordArray(buffer)).toString()
      )
      const signKey = await importSignKey(privateKey.value) // Assuming you have a method to get the sign key

      const signature = await window.crypto.subtle.sign(
        {
          name: 'ECDSA',
          hash: { name: 'SHA-384' }
        },
        signKey,
        buffer
      )

      await contractWithSigner.value.uploadDocument(signedHash, new Uint8Array(signature))

      var signedHashString = new TextDecoder().decode(signedHash)
    }
    router.push({ name: 'ThanksForSigning' })
  }
}

onMounted(async () => {
  await fetchRequest()
  if (requestData.value) {
    fetchDocument(requestData.value.document.file.id)
  }
})
contractStore.initContract()
</script>

<template>
  <div class="relative" v-if="!status">
    <Navbar @finish="onFinish" v-if="requestData" :document="requestData.document" />
    <PrepareDocument
      v-if="requestData"
      :pdf="pdf"
      v-model:signatures="requestData.signatures"
      v-model:canvas="requestData.canvas"
      v-model:users="requestData.users"
      :screen="`SignRequest`"
      class="document"
    />
  </div>
  <div v-else-if="status == 401">
    <el-button
      type="primary"
      @click="router.push({ name: 'signIn', query: { token: route.query.token, email: email } })"
    >
      Login<el-icon class="el-icon--right">
        <Upload />
      </el-icon>
    </el-button>
  </div>
  <div v-else-if="status == 403">
    <el-button
      type="primary"
      @click="router.push({ name: 'signUp', query: { token: route.query.token, email: email } })"
    >
      Register<el-icon class="el-icon--right">
        <Upload />
      </el-icon>
    </el-button>
  </div>
  <UploadPrivateKey v-model:showModal="showModal" @submit="submit" />
</template>

<style scoped>
.document {
  top: 56px;
}
</style>
