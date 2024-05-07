<template>
  <div class="main">
    <div class="flex">
      <img class="mr-3" width="55px" src="@/assets/img/send_sign.png" />
      <div class="flex flex-col items-start">
        <div class="font-bold">Verify Document</div>
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
                  >Verify Document</a
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div>
      <StepCard
        :step="1"
        title="Add file"
        sub-title="What do you want to upload?"
        @some-event="clickAddFile()"
      >
        <template #header-icon>
          <el-icon color="#00b3b3" size="30" class="mr-5"><UploadFilled /></el-icon>
        </template>
        <template #main>
          <AddFile :files="files" @load-file="loadFile" />
        </template>
        <template #pdfViewer>
          <div class="relative w-full" @mouseleave="checkMouseMove = false">
            <div
              @mousemove="checkMouseMove = true"
              id="page-container-small"
              class="absolute right-[-160px] m-auto overflow-auto scale-[0.5] h-80 z-50 top-[-240px]"
            >
              <div id="viewer" class="pdfViewer"></div>
            </div>
            <div
              class="absolute top-[-170px] right-[30px] w-6 h-6 flex items-center justify-center z-50 bg-gray-200"
              v-show="files.length > 0 && checkMouseMove"
              @click="clearFile"
            >
              <el-icon><Close /></el-icon>
            </div>
          </div>
        </template>
      </StepCard>
    </div>
    <el-card class="box-card relative">
      <div>Document name : sample.pdf</div>
      <div>Status : Sent</div>
      <div>Created By : Thank</div>
      <div>Created On : 16-05-2022 22:27:21</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import StepCard from '../StepCard.vue'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'

const files = ref<Array<File>>([])

const clickAddFile = async () => {
  if (files.value.length < 1) {
    ElNotification({
      type: ENotificationType.ERROR,
      title: 'Error',
      message: 'Please upload a file'
    })
    return
  }
}
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
