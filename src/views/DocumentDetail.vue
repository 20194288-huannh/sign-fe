<template>
  <div class="main">
    <span class="font-semibold text-lg">My Documents</span>
    <DocumentsDetail />
  </div>
</template>

<script setup lang="ts">
import DocumentsDetail from '@/components/DocumentDetail/index.vue'
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
