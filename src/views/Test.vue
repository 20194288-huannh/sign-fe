<script setup lang="ts">
import { ref } from 'vue';
import VueDragResize from 'vue-drag-resize/src/component/vue-drag-resize.vue';
const position = ref<{ width: number; height: number; top: number; left: number; }>({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})

const resize = (newRect: { width: number; height: number; top: number; left: number; }) => {
  position.value.width = newRect.width
  position.value.height = newRect.height
  position.value.top = newRect.top
  position.value.left = newRect.left
}
</script >

<template>
    <VueDragResize :w="200"  :h="120" v-on:resizing="resize" v-on:dragging="resize(newRect)">
        <h3>Hello World!</h3>
        <p>{{ position.top }} х {{ position.left }} </p>
        <p>{{ position.width }} х {{ position.height }}</p>
    </VueDragResize>
</template>