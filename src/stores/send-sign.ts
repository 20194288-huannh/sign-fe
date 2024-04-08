import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSendSignStore = defineStore('send-sign', () => {
  const step = ref<number>(1)

  const changeStep = (nextStep: number) => {
    step.value = nextStep
  }

  return { step, changeStep }
})
