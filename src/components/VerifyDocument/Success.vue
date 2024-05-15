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
        <div><span class="font-semibold">Document name:</span> sample.pdf</div>
        <div><span class="font-semibold">Status :</span> Sent</div>
        <div><span class="font-semibold">Created By :</span> Thank</div>
        <div><span class="font-semibold">Created On :</span> 16-05-2022 22:27:21</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Verified } from '@/components/Icon/index.ts'

const isShowDetail = ref<Boolean>(false)
</script>

<style scoped></style>
