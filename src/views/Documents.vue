<template>
  <div class="main">
    <span class="font-semibold text-lg">My Documents</span>
    <Documents />
  </div>
</template>

<script setup lang="ts">
import Documents from '@/components/Documents/index.vue'
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
