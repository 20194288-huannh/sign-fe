<template>
  <el-card class="box-card" style="height: 420px">
    <template #header>
      <div class="card-header flex">
        <el-icon color="#00b3b3" size="30" class="mr-5"><UploadFilled /></el-icon>
        <div>
          <div class="text-base font-semibold">{{ title }}</div>
          <div class="text-xs text-slate-400">What do you want to upload?</div>
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
        <el-button type="primary">
          Upload<el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  subTitle: String,
})
</script>

<style scoped></style>
