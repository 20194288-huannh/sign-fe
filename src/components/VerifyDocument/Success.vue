<template>
  <el-card class="box-card mt-3">
    <div class="bg-[#08b130] h-[120px] flex flex-col items-center justify-center">
      <Verified class="text-white" />
      <div class="mt-4 text-white font-semibold text-[20px]">Verify Completed</div>
    </div>
    <div class="m-4 p-6">
      <div class="text-[24px]">Verify completed successfully!</div>
      <div>The document has been verified and is authentic.</div>
      <el-button type="success" class="mt-6" @click="isShowDetail = !isShowDetail">{{
        isShowDetail ? `Hide detail` : `Show detail`
      }}</el-button>
      <div v-show="isShowDetail" class="mt-6 pt-4 pl-6 text-[16px] border-t-4 border-[#67c23a]">
        <div
          v-for="document in documents"
          :key="document.id"
          class="mt-6 pt-4 pb-4 pl-7 pr-7 border border-gray-300 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 flex justify-between items-center"
        >
          <div>
            <div><span class="font-semibold">Document name:</span> {{ document.file.name }}</div>
            <div><span class="font-semibold">Status :</span> {{ document.status }}</div>
            <div>
              <span class="font-semibold">Created By :</span> {{ document.user.name }} -
              {{ document.user.email }}
            </div>
            <div><span class="font-semibold">Created On :</span> {{ document.requested_on }}</div>
          </div>
          <el-button type="primary" plain @click="download(document.file)">
            <el-icon size="16">
              <Download />
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Verified } from '@/components/Icon'
import { FileService } from '@/services'

const props = defineProps(['documents'])

const isShowDetail = ref<Boolean>(false)
const download = async (file: any) => {
  const response = await FileService.download(file.id)

  const blob = new Blob([response.data], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = file.name
  link.click()
  URL.revokeObjectURL(link.href)
}
</script>

<style scoped></style>
