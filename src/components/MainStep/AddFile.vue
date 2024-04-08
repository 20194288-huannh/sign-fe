<template>
  <el-upload
    class="h-40 w-[40vw] border-gray-200 border-2 border-dashed rounded-xl flex justify-center items-center text-gray-500"
    :show-file-list="false"
    ref="uploadRef"
    :before-upload="beforeUploadFile"
  >
    <div class="text-center text-gray-500" @click.stop v-if="props.files && props.files.length < 1">
      <el-icon :size="60"><upload-filled /></el-icon>
      <div class="text-2xl">Drop file here</div>
    </div>
    <el-button class="!bg-sky-400 !text-white mt-2" v-if="props.files && props.files.length < 1"
      >Upload File</el-button
    >
    <div v-else class="text-blue-700" @click.stop>
      <p>IMAGE TYPE: {{ files?.[0]?.type }}</p>
      <p>IMAGE NAME: {{ files?.[0]?.name }}</p>
    </div>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { ElNotification, type UploadInstance, type UploadProps } from 'element-plus'
import { useSendSignStore } from '@/stores/send-sign'
import { SEND_SIGN_STEP } from '@/constants/send-sign'
import { ENotificationType } from '@/types/notification'

const props = defineProps({
  files: Array<File>
})

const emit = defineEmits(['load-file'])
const { changeStep } = useSendSignStore()
const uploadRef = ref<UploadInstance>()

const beforeUploadFile: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'application/pdf') {
    ElNotification({
      type: ENotificationType.ERROR,
      title: 'Error',
      message: 'can upload jpg or pdf file'
    })
    return false
  } else if (rawFile.size / 1024 / 1024 > 0.5) {
    ElNotification({
      type: ENotificationType.ERROR,
      title: 'Error',
      message: 'jpg/png files with a size less than 500kb'
    })
    return false
  }
  // TODO call API upload file with content-type: multipart/form-data, backend return link file {name: string, url: string}
  emit('load-file', rawFile)
  changeStep(SEND_SIGN_STEP.SECOND_STEP)
  return false
}
</script>

<style scope>
.el-upload {
  display: flex;
  flex-direction: column;
}
</style>
