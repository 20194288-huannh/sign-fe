<template>
  <el-card class="box-card mt-3">
    <div class="bg-[#ff5f56] h-[120px] flex flex-col items-center justify-center">
      <Verified class="text-white" />
      <div class="mt-4 text-white font-semibold text-[20px]">Verify error occurred!</div>
    </div>
    <div class="m-4 p-6">
      <div class="text-[24px]">Verify error occurred!</div>
      <div>The document could not be verified.</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Verified } from '@/components/Icon/index.ts'

const isShowDetail = ref<Boolean>(false)
</script>

<style scoped></style>
