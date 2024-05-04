<template>
  <a
    href="#"
    class="block max-w-sm card-border bg-white border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex h-100 flex-start pr-3"
  >
    <div
      :style="`background-color: ${props.bgColor}`"
      class="doc-items pl-4 pr-4 pt-3 pb-3 text-white rounded-s-lg"
    >
      <slot></slot>
    </div>
    <div class="flex flex-col m-auto ml-3">
      <span class="docs-count">{{ count }}</span>
      <span class="docs-title">{{ props.title }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  bgColor: { type: String, required: true }
})

const count = defineModel('count')
</script>

<style lang="css" scoped>
.docs-count {
  font-weight: bold;
  font-size: 18px;
}
.docs-title {
  color: #9e9e9e;
  font-weight: bold;
  font-size: 13px;
}
.card-border {
  border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
