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
import DocumentRegistryAbi from '@/contracts/artifacts/contracts/DocumentRegistry.sol/DocumentRegistry.json'
import { useSendSignStore } from '@/stores/send-sign'
import { SEND_SIGN_STEP } from '@/constants/send-sign'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import type { Document } from '@/types/document.interface'
import type { SignOwn } from '@/types/send-sign.ts'
import { useKeyStore } from '@/stores/key.ts'
import { useFileStore } from '@/stores/file.ts'
import { useDocumentContractStore } from '@/stores/document-contract.ts'
import CryptoJS from 'crypto-js'

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

const { documentRegistryContractWithSigner, documentRegistryContract, initContract } =
  useDocumentContractStore()

const { readFileAsArrayBuffer, arrayBufferToBytes } = useFileStore()

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

let privateK = `-----BEGIN PRIVATE KEY-----
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
-----END PRIVATE KEY-----`

let publicK = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnYKMaYl4tUnmKeQG+DVX0TZLKCplKvCpP0NLvYMTBlrPnEmPfOM9mXGH5wBlSxNe4j72B+p4Ugx1ICef9/hVJMTszfqgehJE4VPSoJWmo4PncxKV5v5KZrpMBFJWIGjppdrHMetE1gCAD43t+Tu3xp7IcjnXyQQMIsSI1TAWRuylLEjyYIq82d0LBZu2lOyPOxppNiks5IaqOxP42gvoROcV8gQ0irYVZgEz5b6m9rCpqyw3A5gp/WWY9XmTUa0gyJX+tctceGwd6mxE9ZLchSUhigp2GADz0CNeg4f4HBuP9qDB7PqZ0yiZuoJU9K3neX9yaO4sk/6SqsE+xA22U3/oyBOcWedVygOQNVXfp1VWC3SUCW9ipO5RORDNveqChpwmHtQxF7bbx0lwpTdDCXfE5A2GqrrE5zXc4yiEhZeB5Q4ihY1XJ+IN4ueDc4KajyvsZyYmimCbKGSX5r4oG0tJz3oXUx+XSncBz4lw83vlxhliauue8ZGsGL10u6HbuYQ2uTiPcLhDgnykQdP8cn8Qt8t/Uk31LsZmGwXnV//1Vwx3PPQqRmHzA/wxkMRDJMMDPfF+TdJ+NWSwzZgO7lEYPin3MEGV5bzttURk5+2AJZF13lOST+lUeCUN3IOtJAWycguLBYH1jGaqTBOE5OBGs7NpHH081VoEpMVL2DkCAwEAAQ==`
let signK = `-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDBEvCoBrcG7F34C+Q0slLdsW+tngtfGFQ5E2ILsA3gRZ0feQxOb+KxHirbbEHHns7OhZANiAASnBOL7Is+rhfDSmUkT37jS/9K5lRyYt6L+6bih4g9eU4HGVycLhvXrSriQNBKsBB6W1ZQPzYV7FNhYh+DEOWLUVuGIvIQgQWzmq4OVBmyCP3zVw8jBQHDkpb6p9J2jda4=
-----END PRIVATE KEY-----`
let verifyK = `MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEGeAw90v1kvjhkjYXVoSvHemhOm5AaZoCBf1TDODxX5UzpFag5xne9QnqlJTHm2ItZx1XKnvjmQlBNuG1bBV+EF/q3tmsDEi72tripOa837/rPzJbj36U69s2yUUJ1Qtl`

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
}

initContract()
const signOwn = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const file = files.value[0]
      const response = await DocumentService.signOwn(myDocument.value.id, form.value)
      let signedPdf = createFileFromPDF(response.data, 'signed-' + file.name)
      download(response.data, 'signed-' + file.name)

      const buffer = await readFileAsArrayBuffer(signedPdf)
      if (buffer) {
        const signedHash = ethers.utils.toUtf8Bytes(CryptoJS.SHA256(buffer).toString())
        const signKey = await importSignKey(signK) // Assuming you have a method to get the sign key
        const signature = await window.crypto.subtle.sign(
          {
            name: 'ECDSA',
            hash: { name: 'SHA-384' }
          },
          signKey,
          buffer as BufferSource
        )

        await documentRegistryContractWithSigner.value.uploadDocument(
          signedHash,
          ethers.utils.arrayify(new Uint8Array(signature))
        )

        var signedHashString = new TextDecoder().decode(signedHash)
        const response = await DocumentService.saveSignOwn({
          file: signedPdf,
          sha: signedHashString
        })
      }
      // const data = response.data.data
    } catch (error) {}
  }
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
// const signOwn = async () => {
//   let privateKey = await importPrivateKey(privateK)
//   let publicKey = await importPublicKey(publicK)
//   let encoded = getMessageEncoding('123')
//   let encrypt = await window.crypto.subtle.encrypt(
//     {
//       name: "RSA-OAEP",
//     },
//     privateKey,
//     encoded,
//   );
//   let result = await window.crypto.subtle.decrypt(
//     {
//       name: "RSA-OAEP",
//     },
//     publicKey,
//     encrypt,
//   );
//   let a = compareArrayBuffers(result, encoded.buffer)
//   // const response = await DocumentService.signOwn(myDocument.value.id, form.value)
//   if (typeof window.ethereum !== 'undefined') {
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner()
//     // Contract reference
//     const documentRegistryContract = new ethers.Contract(
//       contractAddress,
//       DocumentRegistryAbi.abi,
//       provider
//     )
//     const documentRegistryContractWithSigner = documentRegistryContract.connect(signer)
//     try {
//       // call contract public method
//       // documentRegistryContractWithSigner.uploadDocument('filename')
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
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
