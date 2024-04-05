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
    <div ref="refElement" class="mt-6">
      <div class="hidden-step">
        <div class="flex gap-5">
          <div class="w-16 relative flex justify-center custom-step">
            <div
              class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
              @click="scrollToView(1)"
            >
              1
            </div>
          </div>
          <div class="w-full pb-5">
            <StepCard
              title="Add file"
              sub-title="What do you want to upload?"
              @some-event="clickAddFile()"
            >
              <template #header-icon>
                <el-icon color="#00b3b3" size="30" class="mr-5"><UploadFilled /></el-icon>
              </template>
              <template #main>
                <AddFile v-model:files="files" :files="files" />
              </template>
              <template #pdfViewer>
                <div class="relative h-20">
                  <div
                    id="page-container-small"
                    class="absolute right-0 m-auto overflow-auto scale-[0.5] h-80 z-50 top-[-150px]"
                  >
                    <div id="viewer" class="pdfViewer"></div>
                  </div>
                </div>
              </template>
            </StepCard>
          </div>
        </div>
      </div>
    </div>
    <div ref="refElement" class="mt-6">
      <div class="hidden-step">
        <div class="flex gap-5">
          <div class="w-16 relative flex justify-center custom-step">
            <div
              class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
              @click="scrollToView(2)"
            >
              2
            </div>
          </div>
          <div class="w-full pb-5">
            <StepCard title="Add Recipients" sub-title="Who can sign / view this document?">
              <template #header-icon>
                <el-icon color="#00b3b3" size="30" class="mr-5"><User /></el-icon>
              </template>
              <template #main>
                <AddRecipients />
              </template>
            </StepCard>
          </div>
        </div>
      </div>
    </div>
    <div ref="refElement" class="mt-6">
      <div class="hidden-step">
        <div class="flex gap-5">
          <div class="w-16 relative flex justify-center custom-step">
            <div
              class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
              @click="scrollToView(3)"
            >
              3
            </div>
          </div>
          <div class="w-full pb-5">
            <StepCard title="Send" sub-title="What do you want to convey to the recipients?">
              <template #pdfViewer>
                <div id="pageContainer">
                  <div id="viewer" class="pdfViewer"></div>
                </div>
              </template>
            </StepCard>
          </div>
        </div>
      </div>
    </div>
    <div ref="refElement" class="mt-6">
      <div class="hidden-step">
        <div class="flex gap-5">
          <div class="w-16 relative flex justify-center custom-step">
            <div
              class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
              @click="scrollToView(4)"
            >
              3
            </div>
          </div>
          <div class="w-full pb-5">
            <StepCard title="Send" sub-title="What do you want to convey to the recipients?">
              <template #header-icon>
                <el-icon color="#00b3b3" size="30" class="mr-5"><Message /></el-icon>
              </template>
              <template #main>
                <Send />
              </template>
            </StepCard>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="height: 1500px" class="flex"> -->
    <!-- <el-steps direction="vertical" :active="2">
          <el-step></el-step>
          <el-step></el-step>
          <el-step></el-step>
        </el-steps> -->
    <!-- <div class="flex flex-col flex-1" ref="a">
          <StepCard title="Add file" sub-title="What do you want to upload?" />
          <StepCard title="Add file" sub-title="What do you want to upload?" :ref="b" />
        </div> -->
    <!-- </div> -->
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
import { DocumentService } from '@/services'
import { ethers } from 'ethers'
import BlockSig from '@/contracts/artifacts/contracts/BlockSig.sol/BlockSig.json'
import { useWalletStore } from '@/stores/wallet'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const refElement = ref()
const indexRef = ref(0)
const files = ref<File[]>([])
const walletStore = useWalletStore()
const clickAddFile = async () => {
  console.log(1)
  if (typeof window.ethereum !== 'undefined') {
    //@ts-expect-error Window.ethers not TS
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Contract reference
    const contract = new ethers.Contract(contractAddress, BlockSig.abi, provider)
    try {
      // call contract public method
      console.log(files.value)
      // const fileContent = await readFile(files.value[0] as File);
      // const fileBytes = Array.from(new Uint8Array(fileContent as ArrayBuffer));
      // const fileHash = ethers.utils.keccak256(fileBytes);
      // const data = await contract.createDoc(fileHash, [], false);
    } catch (error) {
      console.error(error)
    }
  }
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

const getPdf = async () => {
  let container = document.getElementById('pageContainer')
  let containerSmall = document.getElementById('page-container-small')
  let pdfViewer = new PDFViewer({
    container: container
  })
  let pdfViewerSmall = new PDFViewer({
    container: containerSmall
  })
  let loadingTask = pdfjsLib.getDocument('/pdf-sample.pdf')
  let pdf = await loadingTask.promise
  pdfViewer.setDocument(pdf)
  pdfViewerSmall.setDocument(pdf)
}

onMounted(() => {
  getPdf()
})

const scrollToView = (idx: number) => {
  const scrollToElement = refElement.value?.children[idx]
  scrollToElement.scrollIntoView({ behavior: 'smooth' })
}
</script>
<style lang="css" scoped>
.main {
  padding: 25px 40px;
}

#pageContainer {
  margin: auto;
  width: 60%;
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
