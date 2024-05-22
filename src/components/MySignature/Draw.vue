<template>
  <div id="app">
    <div class="container">
      <div class="container">
        <VueSignaturePad id="signature" :width="`700px`" :height="`${700 / width * height}px`" ref="signaturePad"
          :options="{ onBegin: () => { signaturePad.resizeCanvas() } }" />
      </div>
      <div class="buttons">
        <button @click="undo">Undo</button>
        <button @click="emit('save', signaturePad)">Save</button>
        <button @click="change">Change Color</button>
        <button @click="resume">Resume Color</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SignatureService } from '@/services/index.js'
defineProps({
  height: {
    type: Number,
    default: 350
  },
  width: {
    type: Number,
    default: 700
  }
})
const emit = defineEmits(['save'])
const options = ref({
  penColor: '#c0f'
})
const signaturePad = ref(null)
const undo = () => {
  signaturePad.value.undoSignature()
}
const change = () => {
  this.options = {
    penColor: '#00f'
  }
}
const resume = () => {
  this.options = {
    penColor: '#c0f'
  }
}
</script>

<style scoped>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: '100%';
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>
