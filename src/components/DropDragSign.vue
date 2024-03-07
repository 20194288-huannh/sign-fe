<script setup lang="ts">
import { ref } from 'vue';
import VueDragResize from 'vue-drag-resize/src/component/vue-drag-resize.vue';

const props = defineProps({
    width: Number,
    height: Number,
    top: Number,
    left: Number
})

const emit = defineEmits(['resize'])
const resize = (newRect: { width: number; height: number; top: number; left: number; }) => {
    emit('resize', newRect)
}
</script >

<template>
    <div>
        <VueDragResize :w="100" :h="40" :z="100" :isResizable="false" v-on:resizing="resize" v-on:dragging="resize">
            <!-- <h3>Hello World!</h3>
            <p>{{ props.top }} х {{ props.left }} </p>
            <p>{{ props.width }} х {{ props.height }}</p> -->
            <div class="h-[40px] rounded-sm border-neutral-400 bg-white shadow-inner ring-1">Hello</div>
        </VueDragResize>
    </div>
</template>