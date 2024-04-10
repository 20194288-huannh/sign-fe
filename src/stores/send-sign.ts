import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ISendSignSecondStep } from '@/types/send-sign'

export const useSendSignStore = defineStore('send-sign', () => {
  const step = ref<number>(1)
  const arrSignSecondStepValue = reactive<{ main: ISendSignSecondStep[] }>({
    main: [
      {
        id: Math.random(),
        name: '',
        email: '',
        type: '0'
      }
    ]
  })

  const changeStep = (nextStep: number) => {
    step.value = nextStep
  }

  return { step, changeStep, arrSignSecondStepValue }
})
