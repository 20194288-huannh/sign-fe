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

const mouseHover = ref<boolean>(false)
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
      :w="props.width"
      :h="props.height"
      :z="100"
      :isResizable="false"
      v-on:resizing="resize"
      v-on:dragging="resize"
      @dragstop="onDragstop"
    >
      <div
        class="min-h-[40px] rounded-sm border-neutral-400 bg-white flex items-center justify-center cursor-pointer relative"
        @mousemove="mouseHover = true"
        @mouseleave="mouseHover = false"
      >
        <div
          class="absolute top-[-10px] right-[-8px] bg-gray-200 h-4 w-4"
          v-if="(props.top !== 0 || props.left !== 0) && mouseHover"
        >
          <el-icon><Close /></el-icon>
        </div>
        <p v-if="props.top === 0 && props.left === 0">{{ text }}</p>
        <slot />
      </div>
    </VueDragResize>
  </div>
</template>
