<template>
  <el-dialog v-model="showModal" title="Upload your private key" width="500">
    <el-upload
      class="upload-demo"
      drag
      ref="uploadRef"
      multiple="false"
      :auto-upload="false"
      v-model:file-list="files"
      limit="1"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 10MB</div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showModal = false">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { UserService } from '@/services'

const showModal = defineModel('showModal')
const emit = defineEmits(['submit'])
const form = ref<{ private_key: File }>()
const files = ref()

const confirm = async () => {
  const response = await UserService.verifyPrivateKey({ file: files.value[0].raw })
  const privateKey = response.data.data.private_key
  showModal.value = false
  emit('submit', privateKey)
}
</script>

<style lang="scss" scoped></style>
