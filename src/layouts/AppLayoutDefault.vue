<template>
  <div class="grid grid-cols-[80px_1fr] h-screen">
    <Navbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>
