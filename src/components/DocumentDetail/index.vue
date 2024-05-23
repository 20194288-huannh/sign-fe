<template>
  <div class="flex gap-5">
    <div class="left basis-2/3">
      <DocumentInfo v-model:document="document" />
      <Recipient class="mt-5" v-if="document" v-model:recipients="document.request.receivers" />
    </div>
    <div class="right basis-1/3">
      <el-card class="content">
        <h3 class="font-semibold pb-4">Audit Trail</h3>
        <el-scrollbar>
          <AuditTrailItem class="scrollbar-demo-item" v-for="action in actions" :action="action" />
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentInfo from './DocumentInfo.vue'
import Recipient from './Recipient.vue'
import AuditTrailItem from '../Dashboard/AuditTrailItem.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { DocumentService } from '@/services'

const route = useRoute()
const document = ref()

const fetchDocument = async () => {
  const response = await DocumentService.find(route.params.id)
  document.value = response.data.data
}

const actions = ref()

const getActionsOfDocument = async () => {
  const response = await DocumentService.getActionsOfDocument(route.params.id)
  actions.value = response.data.data
}

fetchDocument()
getActionsOfDocument()
</script>

<style scoped></style>
