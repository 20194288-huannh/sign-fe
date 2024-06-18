<script setup lang="ts">
import { ref } from 'vue'
import VueDragResize from 'vue-drag-resize/src/component/vue-drag-resize.vue'

const props = defineProps({
  idx: Number,
  width: Number,
  height: Number,
  top: Number,
  left: Number,
  text: String,
  canResize: Boolean,
  color: String,
  isShow: Boolean
})

const mouseHover = ref<boolean>(false)
const emit = defineEmits(['resize', 'dragStop', 'drag', 'close'])
const resize = (newRect: { width: number; height: number; top: number; left: number }) => {
  emit('resize', newRect)
}

const onDrag = (newRect: { width: number; height: number; top: number; left: number }) => {
  emit('drag', newRect)
}

const onDragstop = () => {
  emit('dragStop', false)
}

const close = () => {
  emit('close', props.idx)
}
</script>

<style lang="css" scope>
.vdr.active::before {
  outline: 1.5px dashed #00afb5 !important;
}
.vdr-stick-tl,
.vdr-stick-tr,
.vdr-stick-bl,
.vdr-stick-br {
  border: 1.5px solid #00afb5;
  border-radius: 50px;
  background-color: #fff;
}

.vdr-stick-tm,
.vdr-stick-mr,
.vdr-stick-bm,
.vdr-stick-ml {
  visibility: hidden;
}

.signature-border {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>

<template>
  <VueDragResize
    v-if="isShow"
    :w="props.width"
    :h="props.height"
    :x="props.left"
    :y="props.top"
    :minh="25"
    :minw="55"
    :isDraggable="props.canResize"
    :parentLimitation="true"
    :z="100"
    :isResizable="props.canResize"
    v-on:resizing="resize"
    v-on:dragging="onDrag"
    @dragstop="onDragstop"
  >
    <div
      class="rounded-sm border-neutral-400 flex items-center justify-center cursor-pointer relative w-full h-full signature-border rounded"
      @mousemove="mouseHover = true"
      @mouseleave="mouseHover = false"
    >
      <div
        class="absolute top-[-10px] right-[-8px] bg-gray-200 h-4 w-4"
        v-if="(props.top !== 0 || props.left !== 0) && mouseHover"
        @click="close"
      >
        <el-icon><Close /></el-icon>
      </div>
      <p v-if="props.top === 0 && props.left === 0">{{ text }}</p>
      <slot />
    </div>
  </VueDragResize>
</template>
