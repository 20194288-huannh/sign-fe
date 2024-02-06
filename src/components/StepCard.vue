<template>
  <el-card class="box-card" style="height: 420px">
    <template #header>
      <div class="card-header flex">
        <slot name="header-icon"></slot>
        <div>
          <div class="text-base font-semibold">{{ title }}</div>
          <div class="text-xs text-slate-400">{{ subTitle }}</div>
        </div>
      </div>
    </template>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <template #footer>
      <div class="flex justify-end">
        <el-button color="#00B3B3" size="large" circle
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
