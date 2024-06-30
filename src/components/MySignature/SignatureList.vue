<template>
  <div class="flex">
    <el-row :gutter="80" class="overflow-x-auto !flex-nowrap">
      <el-col :span="8" v-for="signature in signatures" class="mt-10">
        <div
          class="min-h-[40px] rounded-sm border-neutral-400 bg-white flex items-center justify-center cursor-pointer relative group">
          <div class="signature relative">
            <img :src="signature.file?.path" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <div class="absolute top-[-10px] right-[-8px] bg-gray-200 h-7 w-7"
            @click="emit('removeSignatures', signature.id)">
            <el-icon :size="30">
              <Close />
            </el-icon>
          </div>
          <el-button type="primary"
            class="absolute inset-0 flex items-center justify-center w-28 h-10 p-3 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            plain @click="downloadFile(signature.file)">
            <el-icon size="18">
              <Download />
            </el-icon>
            Download
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SignatureService, FileService } from '@/services'
import type { SignatureImage } from '@/types/signature'
import type { FileInfo } from '@/types/document.interface'

const emit = defineEmits(['save', 'removeSignatures'])
const signatures = defineModel<SignatureImage[]>('signatures')
const options = ref({
  penColor: '#c0f'
})
const signaturePad = ref<any>()
const undo = () => {
  signaturePad.value.undoSignature()
}
const change = () => {
  options.value = {
    penColor: '#00f'
  }
}
const resume = () => {
  options.value = {
    penColor: '#c0f'
  }
}

const downloadFile = async (file: FileInfo) => {
  const response = await FileService.download(file.id)

  const blob = new Blob([response.data], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = file.name
  link.click()
  URL.revokeObjectURL(link.href)
}
</script>

<style scope>
.signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

:deep(.el-row) {
  flex-wrap: nowrap !important;
}

.container {
  width: '100%';
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>
