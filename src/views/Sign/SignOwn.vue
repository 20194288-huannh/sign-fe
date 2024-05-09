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
import { ethers } from 'ethers'
import DocumentRegistryAbi from '@/contracts/artifacts/contracts/DocumentRegistry.sol/DocumentRegistry.json'
import { useSendSignStore } from '@/stores/send-sign'
import { SEND_SIGN_STEP } from '@/constants/send-sign'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import type { Document } from '@/types/document.interface'
import type { SignOwn } from '@/types/send-sign.ts'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const refElement = ref()
const files = ref<File[]>([])
const { step, changeStep } = useSendSignStore()
const checkMouseMove = ref<boolean>(false)
const pdf = ref()
const documentId = ref<Number>()
const myDocument = ref()
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
// address of the contract loaded from an environment variable
const contractAddress = import.meta.env.VITE_CONTRACT || ''
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

function iKey() {
  let privateKey = `{\"alg\":\"RSA-OAEP-256\",\"d\":\"AtIeqjm8IfCoEpgDcpeR4kwQU_073oLAW1jY6w4r_cvo958HTZSdJ82Xn_STPfrxXfe1XYtY1T_usUHI22He-ANlcBHDACr6iPjbkRDEQEPMvPjvYzQu88crawsTW_dhQxWT9jgsRRNzdx3dQsQgfXt4c12jCn4ZrrLmK7E7_ByHtHC4WbhR1mPf3rtS_1kSZX37PO0ioOqLpRk8kThykWnsMSoMVjnc73tfcuUPIxTJZ6M_powMLDXTQawKngBQ4RNIOELrdBGMgPbn7Ts7N4Rs0G4HxU4PHgmDJ8BxMxE1UCAN5a_9ZNMxLpWH4EH8XXpNcmIk0hRB9y7I1KslhQ\",\"dp\":\"QADjuGy6oCoOAo6DaqBefvswj0GsSUmUBaIByouALVMSdliMoGvjaCsQJ_e7fMtTTemg_4D1k_lIYC0R2xd6dFlrQK8UAS4vBZCRvLkFBs6jkV4gGwu299ADUgCES-J7WwFIPUrxMrwd_drgUlMaALvD91J5-HG-CMnY8XtAjLM\",\"dq\":\"SwtbW3bOCsTsFaaRNODp4Rk__H6BaRFQh_Y0XhF4nfYQf5LsDYapr4MQr3JHhAIc4rZ32lgYuZfGaI9FAmaPmMwOwmwZh4PvZI0No4nRyCskjCKqoq_t8nNZR02yLvxmK7Vzm9fACjXgxHOw6U1hP308rREs2qvLKT6uiJ_1JN8\",\"e\":\"AQAB\",\"ext\":true,\"key_ops\":[\"decrypt\"],\"kty\":\"RSA\",\"n\":\"wF4qLnVOf4tTLhu3K7FGjsVLZvnV16yVvKhtufawV1lxn5DlQcan767dg-p5nxVnVcwkkAo5Ko9NTaV1QXWSN4GV1bJ_2RoG6bpZfH4WHmHEAHIcRjZijcBinuZEeSM5ZbfSIIkN6yW0fyfK4920Pcq0TUazlK7MRFm9Bwi0cAcDO5DwZWx-hCWtMXAF4gf7j-RYeGSmaBlVbYsF24ZtNZCYFaav7Q0zaE2qOTdvkuPUmBZGEjIJw8snCmB_Mn93ebWmv9GhskQErHglo241lF3r_ib1TviAZ84AqxkSEwUpQVV1g_xu9D068I4QBR3jm3bePnxD6r8lf9WkJDgnyQ\",\"p\":\"3_ZtnPaRv01MbgMrttet3rLqj1wiUkiLMM-laWqjkfwIfnLicq_bwGR_DOpT58NQBPz23wRZBeAoJqy3p3IIAelw-QUUmihTRBPyWVk9OC_taSYPWitpa3ZtS29czUlLZyN8tPYt0BiBDxafv4fiazayov2uKi1w7IVD_gjNk2M\",\"q\":\"2-K6KG1YEVbkXadsEqhNZOeH18lQCHR8raK5No779AkvOy19x2wGQE8c84wF4uDpuaYjDiJwqlBS9dgegn7z5ROOH5lnD8zNs_BSafSjavH8z1Yiva4gavYBShMVydjNGngOBiZ6a36b77T6tk5idqv7ILKpjQbO4GuVpB8m3eM\",\"qi\":\"S_cMUnLqTVNzsHJlgIcl3KnQwU8GOMjp0t1wn2WPE01zBSLsI4QVRwx3jDC5QB_PW1SIt4hAM1Wx97tRF90yf5itGTP_yXWCMzT03SFZDzXduddokKu_zqSmaMNcJ5n1W5SiO3Pqh9b6WEMwFmlYT5qHy2gaaxgHPXc-WYJRJ88\"}`
  privateKey = JSON.parse(privateKey)
  console.log(privateKey)
  return window.crypto.subtle.importKey(
    'spki',
    privateKey,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256'
    },
    true,
    ['encrypt']
  )
}

const signOwn = async () => {
  let e_key = await iKey()
  let signature = await window.crypto.subtle.sign(
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' }
    },
    e_key,
    pdf.value
  )
  console.log(signature)
  // // const response = await DocumentService.signOwn(myDocument.value.id, form.value)
  // if (typeof window.ethereum !== 'undefined') {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const signer = provider.getSigner()
  //   // Contract reference
  //   const documentRegistryContract = new ethers.Contract(
  //     contractAddress,
  //     DocumentRegistryAbi.abi,
  //     provider
  //   )
  //   const documentRegistryContractWithSigner = documentRegistryContract.connect(signer)
  //   try {
  //     // call contract public method
  //     // documentRegistryContractWithSigner.uploadDocument('filename')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
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
