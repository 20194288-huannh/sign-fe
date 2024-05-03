<template>
  <div class="main">
    <span class="font-semibold text-lg">Dashboard</span>
    <DocumentStatistic />
  </div>
</template>

<script setup lang="ts">
import DocumentStatistic from '@/components/DocumentStatistic.vue'
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
