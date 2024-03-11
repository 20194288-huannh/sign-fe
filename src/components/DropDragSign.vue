<script setup lang="ts">
import { ref } from 'vue'
import VueDragResize from 'vue-drag-resize/src/component/vue-drag-resize.vue'

const props = defineProps({
  width: Number,
  height: Number,
  top: Number,
  left: Number,
  text: String
})

const emit = defineEmits(['resize', 'dragStop'])
const resize = (newRect: { width: number; height: number; top: number; left: number }) => {
  emit('resize', newRect)
}

const onDragstop = () => {
  emit('dragStop', false)
}
</script>

<template>
  <div>
    <VueDragResize
      :w="100"
      :h="40"
      :z="100"
      :isResizable="false"
      v-on:resizing="resize"
      v-on:dragging="resize"
      @dragstop="onDragstop"
    >
      <div
        class="h-[40px] rounded-sm border-neutral-400 bg-white shadow-inner ring-1 flex items-center justify-center"
      >
        {{ text }}
      </div>
    </VueDragResize>
  </div>
</template>
