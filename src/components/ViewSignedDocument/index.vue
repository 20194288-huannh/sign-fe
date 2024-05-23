<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/web/pdf_viewer.css'
import { RequestService } from '@/services/index.js'
import { useRoute, useRouter } from 'vue-router'
import type { Receiver, Signature, Canvas } from '@/types/send-sign'
import type { Document } from '@/types/document.interface'
import { DocumentService } from '@/services/index.js'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

interface RequestData {
  signatures: Signature
  users: Receiver
  document: Document
  canvas: Canvas
  token: string
}

const route = useRoute()
const router = useRouter()
const pdf = ref<any>()
const requestData = ref<RequestData>()

const fetchDocument = async (id: Number) => {
  let loadingTask = pdfjsLib.getDocument(`http://localhost:8868/api/files/${id}`)
  pdf.value = await loadingTask.promise
}

const fetchRequest = async () => {
  const response = await RequestService.get(route.query.token)
  requestData.value = response.data.data
}

const onFinish = async () => {
  if (requestData.value) {
    requestData.value.token = route.query.token as string
    const response = await DocumentService.sign(requestData.value?.document.id, requestData.value)
    router.push({ name: 'ThanksForSigning' })
  }
}

onMounted(async () => {
  await fetchRequest()
  if (requestData.value) {
    fetchDocument(requestData.value.document.file.id)
  }
})
</script>

<template>
  <div class="relative">
    <Navbar @finish="onFinish" />
    <PrepareDocument
      v-if="requestData"
      :pdf="pdf"
      v-model:signatures="requestData.signatures"
      v-model:canvas="requestData.canvas"
      v-model:users="requestData.users"
      class="document"
    />
  </div>
</template>

<style scoped>
.document {
  top: 56px;
}
</style>
