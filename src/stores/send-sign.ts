import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISendSignSecondStep } from '@/types/send-sign'

export const useSendSignStore = defineStore('send-sign', () => {
  const step = ref<number>(1)
  const valueArrSignSecondStep = ref<ISendSignSecondStep[]>([])

  const changeStep = (nextStep: number) => {
    step.value = nextStep
  }

  const updateValueStep2 = (data: ISendSignSecondStep[]) => {
    valueArrSignSecondStep.value = data
  }

  return { step, changeStep, valueArrSignSecondStep, updateValueStep2 }
})
