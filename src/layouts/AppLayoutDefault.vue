<template>
  <div>
    <div class="w-[calc(100vw-18px)] h-16 items-center flex p-5 justify-between shadow-lg">
      <div>Sign.co</div>
      <el-button
        class="cursor-pointer flex items-center gap-2"
        v-popover="popoverRef"
        v-click-outside="onClickOutside"
      >
        Nguyen Huu Huan
        <el-icon><CaretBottom class="w-4 h-4 text-sky-700" /></el-icon>
      </el-button>

      <el-popover ref="popoverRef" trigger="click" width="250" virtual-triggering persistent>
        <div class="flex gap-4">
          <img
            class="h-16 w-16 rounded-full"
            src="https://imgs.search.brave.com/x73lYG7wBlQUVQRgRtiWNG2a3a3vcEnlraEHFSkdJ1c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92Y2Ru/LXNvaG9hLnZuZWNk/bi5uZXQvMjAyMy8w/OC8yMy9uZ29jLWFu/aC05OTY4LTE2OTI3/NzczMjMuanBn"
          />
          <div>
            <p>Nguyen Huu Huan</p>
            <p>huan.nh194288</p>
            <router-link to="/me" class="text-blue-500 cursor-pointer underline"
              >View Profile</router-link
            >
          </div>
        </div>
        <div class="mt-4">
          <router-link :to="item.action" v-for="item in actionPopover" :key="item.label">
            <div
              class="flex items-center gap-2 cursor-pointer hover:bg-purple-400 hover:text-white p-1"
            >
              <el-icon><component :is="item.icon" /></el-icon> {{ item.label }}
            </div>
          </router-link>
        </div>
      </el-popover>
    </div>
    <div class="grid grid-cols-[58px_1fr] h-[calc(100vh-64px)]">
      <Navbar />
      <div class="overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const actionPopover = [
  { icon: 'Edit', label: 'My Signature', action: '/my-signature' },
  { icon: 'Lock', label: 'Change Password', action: '/change-password' },
  { icon: 'Rank', label: 'Log Out', action: '/log-out' }
]
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
