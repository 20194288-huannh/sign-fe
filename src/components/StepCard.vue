<template>
  <el-card class="box-card">
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
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  subTitle: String
})

</script>

<style scoped></style>
