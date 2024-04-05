<template>
  <el-upload
    v-model="files"
    ref="uploadRef"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
    :on-change="beforeUploadFile"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { UploadInstance } from 'element-plus'

const props = defineProps({
  files: Array<{ name: string; url: string }>
})

const files = ref(props.files)

console.log(files)
const beforeUploadFile = (e) => {
  console.log(e)
}

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}
</script>
