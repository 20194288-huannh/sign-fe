<template>
  <div class="main">
    <div class="flex">
      <img class="mr-3" width="55px" src="@/assets/img/sign_own.png" />
      <div class="flex flex-col items-start">
        <div class="font-bold">Sign your Own</div>
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <a
                href="#"
                class="inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Start Sign
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >Sign your own</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div ref="refElement">
      <div v-for="(item, idx) in customStep" :key="item.id" class="hidden-step">
        <div class="flex gap-5">
          <div class="w-16 relative flex justify-center custom-step">
            <div
              class="flex justify-center rounded-full items-center h-12 w-12 border-sky-600 border-2 cursor-pointer text-sky-600"
              @click="scrollToView(idx)"
            >
              {{ item.id }}
            </div>
          </div>
          <div class="w-full">
            <component :is="item.component" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="height: 1500px" class="flex"> -->
    <!-- <el-steps direction="vertical" :active="2">
        <el-step></el-step>
        <el-step></el-step>
        <el-step></el-step>
      </el-steps> -->
    <!-- <div class="flex flex-col flex-1" ref="a">
        <StepCard title="Add file" sub-title="What do you want to upload?" />
        <StepCard title="Add file" sub-title="What do you want to upload?" :ref="b" />
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import StepCard from '@/components/StepCard.vue'
import Step1 from './FirstPage/Step1.vue'
import Step2 from './FirstPage/Step2.vue'
import Step3 from './FirstPage/Step3.vue'

const refElement = ref()
const indexRef = ref(0)
const customStep = ref([
  { id: 1, component: Step1 },
  { id: 2, component: Step2 },
  { id: 3, component: Step3 }
])

watch(
  () => indexRef.value,
  () => {
    console.log(123)
  }
)

const scrollToView = (idx: number) => {
  const scrollToElement = refElement.value?.children[idx]
  scrollToElement.scrollIntoView({ behavior: 'smooth' })
}
</script>
<style lang="css" scoped>
.main {
  padding: 25px 40px;
}
</style>
