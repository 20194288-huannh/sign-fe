<template>
  <el-card class="box-card relative">
    <div
      class="absolute top-0 h-full w-full bg-white left-0 opacity-95 z-50"
      v-if="props.step && sendSignStore.step < props.step"
    />
    <template #header>
      <div class="card-header flex">
        <slot name="header-icon"></slot>
        <div>
          <div class="text-base font-semibold">{{ title }}</div>
          <div class="text-xs text-slate-400">{{ subTitle }}</div>
        </div>
      </div>
    </template>
    <slot name="main"></slot>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="$emit('someEvent')" color="#00B3B3" size="large" circle
          ><el-icon size="20"><Right /></el-icon
        ></el-button>
      </div>
    </template>
    <slot name="pdfViewer" />
  </el-card>
</template>

<script setup lang="ts">
import { useSendSignStore } from '@/stores/send-sign'

const props = defineProps({
  title: String,
  subTitle: String,
  step: {
    type: Number,
    required: false
  }
})

const sendSignStore = useSendSignStore()
</script>

<style scoped></style>
