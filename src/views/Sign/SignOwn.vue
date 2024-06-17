<template>
  <div class="main">
    <div class="flex">
      <img class="mr-3" width="55px" src="@/assets/img/send_sign.png" />
      <div class="flex flex-col items-start">
        <div class="font-bold">Sign Your Own</div>
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
                  >Sign Your Own</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div ref="refElement">
      <div class="pt-6">
        <div class="hidden-step">
          <div class="flex gap-5">
            <div class="w-16 relative flex justify-center custom-step">
              <div
                class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
                @click="scrollToView(SEND_SIGN_STEP.FIRST_STEP)"
              >
                {{ SEND_SIGN_STEP.FIRST_STEP }}
              </div>
            </div>
            <div class="w-full pb-5">
              <StepCard
                :step="SEND_SIGN_STEP.FIRST_STEP"
                title="Add file"
                sub-title="What do you want to upload?"
                @some-event="clickAddFile()"
              >
                <template #header-icon>
                  <el-icon color="#00b3b3" size="30" class="mr-5">
                    <UploadFilled />
                  </el-icon>
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
                      <el-icon>
                        <Close />
                      </el-icon>
                    </div>
                  </div>
                </template>
              </StepCard>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div class="hidden-step">
          <div class="flex gap-5">
            <div class="w-16 relative flex justify-center custom-step">
              <div
                class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
                @click="scrollToView(SEND_SIGN_STEP.SECOND_STEP)"
              >
                {{ SEND_SIGN_STEP.SECOND_STEP }}
              </div>
            </div>
            <div class="w-full pb-5">
              <StepCard
                :step="SEND_SIGN_STEP.SECOND_STEP"
                title="Send"
                sub-title="What do you want to convey to the recipients?"
                @some-event="signOwn"
              >
                <template #pdfViewer>
                  <PrepareDocument
                    :pdf="pdf"
                    v-model:signatures="form.signatures"
                    :canvas="form.canvas"
                  />
                </template>
              </StepCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UploadPrivateKey v-model:showModal="showModal" @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import { ref, watch, onMounted } from 'vue'
import StepCard from '@/components/StepCard.vue'
import AddFile from '@/components/MainStep/AddFile.vue'
import { DocumentService } from '@/services'
import { Contract, ethers } from 'ethers'
import { useSendSignStore } from '@/stores/send-sign'
import { SEND_SIGN_STEP } from '@/constants/send-sign'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import type { Document } from '@/types/document.interface'
import type { SignOwn } from '@/types/send-sign.ts'
import { useKeyStore } from '@/stores/key'
import { useFileStore } from '@/stores/file'
import { useContractStore } from '@/stores/contract'
import CryptoJS from 'crypto-js'
import { storeToRefs } from 'pinia'
import UploadPrivateKey from '@/components/UploadPrivateKey.vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const {
  key,
  importPrivateKey,
  importPublicKey,
  compareArrayBuffers,
  importVerifyKey,
  importSignKey
} = useKeyStore()

const contractStore = useContractStore()
const { contractWithSigner, contract } = storeToRefs(contractStore)

const { arrayBufferToWordArray } = useFileStore()

const refElement = ref()
const files = ref<File[]>([])
const { step, changeStep } = useSendSignStore()
const checkMouseMove = ref<boolean>(false)
const pdf = ref()
const documentId = ref<Number>()
const myDocument = ref()
const showModal = ref<Boolean>(false)
const privateKey = ref<string>(
  'MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDCpGhexCSi6kHmCjllsvmsll43wnBS1SBrqn9yj0VWHg7HMpjcD3m+kxtDRB2iQBiahZANiAAT7S+Sv916vmwZtVvfK0adxTXhEXGXu3/obaCl5Vv/VYLxYC0M9Z+AEA3D4F7dwmCrhlHY4qjGcuc6+M2jF9A6rw7+wll15vIBBosJ+YTPcDsuh0ykP0LwbCRKz7gR5ppU='
)
const form = ref<SignOwn>({
  signatures: [],
  canvas: {
    height: 0,
    width: 0
  }
})

const clickAddFile = async () => {
  if (files.value.length < 1) {
    ElNotification({
      type: ENotificationType.ERROR,
      title: 'Error',
      message: 'Please upload a file'
    })
    return
  }
  changeStep(SEND_SIGN_STEP.SECOND_STEP)
  scrollToView(SEND_SIGN_STEP.SECOND_STEP)
}

const clearFile = () => {
  files.value = []
  changeStep(SEND_SIGN_STEP.FIRST_STEP)
}

let verifyK = `MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE+0vkr/der5sGbVb3ytGncU14RFxl7t/6G2gpeVb/1WC8WAtDPWfgBANw+Be3cJgq4ZR2OKoxnLnOvjNoxfQOq8O/sJZdebyAQaLCfmEz3A7LodMpD9C8GwkSs+4EeaaV`

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

contractStore.initContract()
const signOwn = () => {
  showModal.value = true
}

const submit = async (key: string) => {
  privateKey.value = key
  if (typeof window.ethereum !== 'undefined') {
    try {
      const file = files.value[0]
      const response = await DocumentService.signOwn(myDocument.value.id, form.value)
      let signedPdf = createFileFromPDF(response.data, 'signed-' + file.name)
      download(response.data, 'signed-' + file.name)

      const buffer = await response.data.arrayBuffer()
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
        const response = await DocumentService.saveSignOwn(myDocument.value.id, {
          file: signedPdf,
          sha: signedHashString
        })
      }
      // const data = response.data.data
    } catch (error) {}
  }
}

const getPdf = async () => {
  let container = document.getElementById('pageContainer')
  let containerSmall = document.getElementById('page-container-small')
  let pdfViewerSmall = new PDFViewer({
    container: containerSmall
  })
  let loadingTask = pdfjsLib.getDocument(
    `http://localhost:8868/api/files/${myDocument.value.file.id}`
  )
  pdf.value = await loadingTask.promise

  pdfViewerSmall.setDocument(pdf.value)
}

const loadFile = (file: any) => {
  files.value = [file]
}

const scrollToView = (idx: number) => {
  const scrollToElement = refElement.value?.children[idx - 1]
  scrollToElement.scrollIntoView({ behavior: 'smooth' })
}

watch(
  () => files.value,
  async () => {
    const response = await DocumentService.save({ file: files.value[0] })
    myDocument.value = response.data.data
    const myFile = response.data
    if (files.value.length > 0) {
      getPdf()
    }
  }
)
</script>
<style lang="css" scoped>
.main {
  padding: 25px 40px;
}

#pageContainer {
  margin: auto;
  /* width: 60%; */
  scale: 1;
  height: 700px;
  overflow: scroll;
}

#viewer {
  display: flex;
  flex-direction: column;
  background-color: #eff1f3;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
@/stores/contract
