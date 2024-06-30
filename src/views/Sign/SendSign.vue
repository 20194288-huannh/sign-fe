<template>
  <div class="main">
    <div class="flex">
      <img class="mr-3" width="55px" src="@/assets/img/send_sign.png" />
      <div class="flex flex-col items-start">
        <div class="font-bold">Send for Signature</div>
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
                  >Send for Signature</a
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
                title="Add Recipients"
                sub-title="Who can sign / view this document?"
                @some-event="scrollToThirdStep"
              >
                <template #header-icon>
                  <el-icon color="#00b3b3" size="30" class="mr-5"><User /></el-icon>
                </template>
                <template #main>
                  <AddRecipients v-model:users="form.users" />
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
                @click="scrollToView(SEND_SIGN_STEP.THIRD_STEP)"
              >
                {{ SEND_SIGN_STEP.THIRD_STEP }}
              </div>
            </div>
            <div class="w-full pb-5">
              <StepCard
                :step="SEND_SIGN_STEP.THIRD_STEP"
                title="Send"
                sub-title="What do you want to convey to the recipients?"
                @some-event="
                  () => {
                    changeStep(SEND_SIGN_STEP.FOURTH_STEP)
                    scrollToView(SEND_SIGN_STEP.FOURTH_STEP)
                  }
                "
              >
                <template #pdfViewer>
                  <PrepareDocument
                    :screen="`sendSign`"
                    :pdf="pdf"
                    v-model:signatures="form.signatures"
                    :canvas="form.canvas"
                    :users="form.users"
                  />
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
                @click="scrollToView(SEND_SIGN_STEP.FOURTH_STEP)"
              >
                {{ SEND_SIGN_STEP.FOURTH_STEP }}
              </div>
            </div>
            <div class="w-full pb-5">
              <StepCard
                :step="SEND_SIGN_STEP.FOURTH_STEP"
                title="Send"
                sub-title="What do you want to convey to the recipients?"
                @some-event="sendSign"
              >
                <template #header-icon>
                  <el-icon color="#00b3b3" size="30" class="mr-5"><Message /></el-icon>
                </template>
                <template #main>
                  <Send v-model:email="form.email" />
                </template>
              </StepCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import { ref, watch, onMounted } from 'vue'
import StepCard from '@/components/StepCard.vue'
import AddFile from '@/components/MainStep/AddFile.vue'
import AddRecipients from '@/components/MainStep/AddRecipients.vue'
import Send from '@/components/MainStep/Send/index.vue'
import { DocumentService } from '@/services/index.js'
import { ethers } from 'ethers'
import { useSendSignStore } from '@/stores/send-sign'
import { SEND_SIGN_STEP } from '@/constants/send-sign'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import type { Document } from '@/types/document.interface'
import { useRouter } from 'vue-router'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const refElement = ref()
const files = ref<File[]>([])
const myDocument = ref<Document>()
const { step, changeStep } = useSendSignStore()
const checkMouseMove = ref<boolean>(false)
const router = useRouter()
const pdf = ref()
interface User {
  name: string
  type: number
  email: string
}
interface Form {
  users: User[]
}
const form = ref<any>({
  users: [
    {
      name: '',
      email: '',
      type: '0'
    }
  ],
  signatures: [],
  email: {
    subject: 'SENDER_NAME (SENDER_EMAIL_ID) Needs Your Signature for the DOCUMENT_NAME',
    expired_date: '',
    content: ''
  },
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
// address of the contract loaded from an environment variable
const contractAddress = import.meta.env.VITE_BLOCKSIG_CONTRACT || ''
// stores all messages

const readFile = async (file: File) => {
  const blob = new Blob([file])
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(blob)
  })
}

const clearFile = () => {
  files.value = []
  changeStep(SEND_SIGN_STEP.FIRST_STEP)
}

const baseDomain = import.meta.env.VITE_APP_BASE_URL
const getPdf = async (id: number) => {
  let containerSmall = document.getElementById('page-container-small')
  let pdfViewerSmall = new PDFViewer({
    container: containerSmall
  })
  let loadingTask = pdfjsLib.getDocument(`${baseDomain}files/${id}`)
  pdf.value = await loadingTask.promise

  pdfViewerSmall.setDocument(pdf.value)
}

const loadFile = (file: any) => {
  files.value = [file]
}

const scrollToThirdStep = () => {
  changeStep(SEND_SIGN_STEP.THIRD_STEP)
  scrollToView(SEND_SIGN_STEP.THIRD_STEP)
}

const scrollToView = (idx: number) => {
  const scrollToElement = refElement.value?.children[idx - 1]
  scrollToElement.scrollIntoView({ behavior: 'smooth' })
}

const sendSign = async () => {
  if (myDocument.value) {
    const response = await DocumentService.sendSign(myDocument.value.id, form.value)
    router.push({ name: 'Documents' })
  }
}

watch(
  () => files.value,
  async () => {
    const response = await DocumentService.save({ file: files.value[0] })
    myDocument.value = response.data.data
    if (files.value.length > 0 && myDocument.value) {
      getPdf(myDocument.value.file.id)
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
