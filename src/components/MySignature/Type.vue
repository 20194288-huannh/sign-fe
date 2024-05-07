<template>
  <div id="app">
    <div class="container">
      <div class="container">
        <el-input v-model="name" class="w-100" placeholder="Please input" />
      </div>
      <div class="buttons">
        <button @click="emit('sign')">Sign</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['sign'])
const name = defineModel('name')
</script>

<style scoped>
.container {
  width: '100%';
  padding: 8px 16px;
}

.buttons {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
</style>
