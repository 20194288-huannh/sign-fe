<template>
  <div class="main">
    <div class="flex border-b-2 pb-3">
      <span class="text-lg font-semibold">Choose your way to Sign?</span>
    </div>
    <div class="flex justify-center w-full mt-4">
      <div class="flex justify-center w-[80%] gap-5">
        <el-card
          v-for="item in items"
          shadow="always"
          class="flex-1 flex justify-center items-center"
        >
          <router-link :to="item.link">
            <img :src="item.image" :alt="item.label" width="150px" />
            <span class="flex justify-center font-semibold mt-3">{{ item.label }}</span>
          </router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SendSign from '@/assets/img/send_sign.png'
import SendOwn from '@/assets/img/sign_own.png'
import InpersonSign from '@/assets/img/inperson_sign.png'
import { ref } from 'vue'

const items = ref<Array<{ label: string; image: string; link: string }>>([
  { label: 'Send for Signature', image: SendSign, link: '/sign/send-sign' },
  { label: 'Sign Your Own', image: SendOwn, link: '/sign/sign-own' },
  { label: 'In-person Sign', image: InpersonSign, link: '/sign/verify-document' }
])
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
