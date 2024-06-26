<template>
  <StepCard
    title="Prepare Document - pdf-sample"
    sub-title="Where can the recipients be added to sign the document?"
  >
    <template #header-icon>
      <el-icon color="#00b3b3" size="30" class="mr-5">
        <component is="Message" />
      </el-icon>
    </template>
    <template #main>
      <PrepareDocument :pdf="pdf" v-model:signatures="form.signatures" :canvas="form.canvas" />
    </template>
  </StepCard>
</template>

<script lang="ts" setup>
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import StepCard from '@/components/StepCard.vue'
import { ref, onMounted } from 'vue'
import pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/web/pdf_viewer.css'
import { RequestService } from '@/services/index.js'
import { useRoute } from 'vue-router'
import type { Receiver, Signature, Canvas, SignOwn } from '@/types/send-sign'
import type { Document } from '@/types/document.interface'
import { DocumentService } from '@/services/index.js'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

interface RequestData {
  signatures: Signature
  users: Receiver
  document: Document
  canvas: Canvas
}

const route = useRoute()
const pdf = ref<any>()
const requestData = ref<RequestData>()
const form = ref<SignOwn>({
  signatures: [],
  canvas: {
    height: 0,
    width: 0
  }
})

const baseDomain = import.meta.env.VITE_APP_BASE_URL
const fetchDocument = async (id: Number) => {
  let loadingTask = pdfjsLib.getDocument(`${baseDomain}files/${id}`)
  pdf.value = await loadingTask.promise
}

const fetchRequest = async () => {
  const response = await RequestService.get(route.query.token || '')
  requestData.value = response.data.data
}

const onFinish = async () => {
  if (requestData.value) {
    const response = await DocumentService.sign(requestData.value.document.id, requestData.value)
  }
}

onMounted(async () => {
  fetchDocument(5)
})
</script>

<style></style>
