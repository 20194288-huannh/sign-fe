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
        @some-event="verify()"
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
    <el-card class="box-card relative">
      <div class="bg-[#08b130] h-[100px] flex items-center justify-center">
        <Verified class=""/>
      </div>
      <div>Document name : sample.pdf</div>
      <div>Status : Sent</div>
      <div>Created By : Thank</div>
      <div>Created On : 16-05-2022 22:27:21</div>
    </el-card>
  </div>
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
import { Buffer } from 'buffer'
import {Verified } from '@/components/Icon/index.ts'
const files = ref<Array<File>>([])
const checkMouseMove = ref<boolean>(false)
const pdf = ref()
const { importVerifyKey } = useKeyStore()
const { bytesToArrayBuffer } = useFileStore()
const verifyKey = ref<CryptoKey>()

let signature = [
  47, 168, 131, 171, 39, 29, 232, 116, 2, 255, 230, 138, 228, 65, 91, 249, 40, 175, 110, 155, 204,
  36, 124, 177, 30, 252, 86, 199, 54, 121, 80, 51, 116, 255, 57, 221, 88, 185, 112, 25, 25, 60, 226,
  214, 89, 142, 70, 184, 216, 226, 232, 133, 71, 245, 88, 227, 203, 83, 130, 135, 55, 154, 186, 56,
  129, 195, 55, 137, 43, 144, 146, 169, 227, 45, 134, 237, 223, 239, 206, 33, 170, 111, 3, 253, 39,
  180, 136, 37, 175, 254, 85, 79, 25, 63, 174, 12
]
let verifyK = `MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEGeAw90v1kvjhkjYXVoSvHemhOm5AaZoCBf1TDODxX5UzpFag5xne9QnqlJTHm2ItZx1XKnvjmQlBNuG1bBV+EF/q3tmsDEi72tripOa837/rPzJbj36U69s2yUUJ1Qtl`
const getKey = async () => {
  verifyKey.value = await importVerifyKey(verifyK)
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
  await getKey()
  const file = files.value[0]
  const reader = new FileReader()

  reader.onload = async () => {
    const buffer = reader.result
    // Now you have the file content in buffer variable, which you can use as a BufferSource
    // You can pass this buffer to any function or API that accepts BufferSource
    const signatureBuff = bytesToArrayBuffer(signature)
    let result = await window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' }
      },
      verifyKey.value as CryptoKey,
      signatureBuff,
      buffer as BufferSource
    )
    console.log(result)
  }

  reader.readAsArrayBuffer(file)
}

const clearFile = () => {
  files.value = []
}

const loadFile = (file: any) => {
  files.value = [file]
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
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
