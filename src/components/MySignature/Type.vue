<template>
  <div id="app">
    <div class="container">
      <div class="container">
        <el-input v-model="signature" class="w-100 h-[30px]" placeholder="Please input" />
      </div>
      <div class="flex justify-center mt-5 pb-8">Sign Here</div>
      <div class="grid grid-cols-2 bg-[#f0f3f9]">
        <div class="flex items-center border ps-2">
          <input
            v-model="selected"
            id="inline-radio"
            type="radio"
            value="1"
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 mr-4 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="inline-radio" class="ms-2 Southam font50 pt-4 pb-4">{{ signature }}</label>
        </div>
        <div class="flex items-center border ps-2">
          <input
            v-model="selected"
            id="inline-2-radio"
            type="radio"
            value="2"
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 mr-4 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="inline-2-radio" class="ms-2 Creattion font50 pt-4 pb-4">{{
            signature
          }}</label>
        </div>
        <div class="flex items-center border ps-2">
          <input
            v-model="selected"
            id="inline-3-radio"
            type="radio"
            value="3"
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 mr-4 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="inline-3-radio" class="ms-2 Allison_Script font50">{{ signature }}</label>
        </div>
        <div class="flex items-center border ps-2 pt-4 pb-4">
          <input
            v-model="selected"
            id="inline-4-radio"
            type="radio"
            value="4"
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 mr-4 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="inline-4-radio" class="ms-2 Southam font50">{{ signature }}</label>
        </div>
      </div>
      <div class="buttons">
        <button @click="emit('sign', selected)">Sign</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['sign'])
const signature = defineModel('signature')
const selected = ref<number>()
</script>

<style scoped>
:deep(.el-radio__label) {
  font-size: 50px !important;
  color: #4d525d !important;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  color: rgb(77, 82, 93) !important;
  background-color: #fff;
  font-size: 24px;
  width: 18px;
  height: 18px;
}
.font50 {
  font-size: 50px;
}
.radio {
  display: flex;
}
@font-face {
  font-family: Southam;
  src: url('Southam Demo.otf');
}
@font-face {
  font-family: Creattion;
  src: url('Creattion Demo.otf');
}
@font-face {
  font-family: Allison_Script;
  src: url('Allison_Script.otf');
}
@font-face {
  font-family: Southam;
  src: url('Southam Demo.otf');
}

.Southam {
  font-family: Southam;
}

.Creattion {
  font-family: Creattion;
}

.Allison_Script {
  font-family: Creattion;
}
.container {
  width: '100%';
  padding: 8px 16px;
}

.buttons {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
</style>
