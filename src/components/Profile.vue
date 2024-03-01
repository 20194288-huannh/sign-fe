<template>
  <div class="main">
    <div class="flex border-b-2 pb-3">
      <el-icon class="mr-3" size="25" color="#00B3B3">
        <Avatar />
      </el-icon>
      <span class="text-lg font-semibold">Profile</span>
    </div>
    <el-card class="box-card mt-3">
      <div class="col-span-full flex pl-5 pr-5 max-w-5xl gap-7">
        <AvatarComponent />
        <div class="flex flex-1 flex-col">
          <div class="flex flex-col dash-border pb-4">
            <span class="font-semibold">Name</span>
            <span class="text-[24px] text-blue-400 font-semibold">Nguyen Huu Huan</span>
          </div>
          <div class="flex dash-border justify-between mt-5 pb-5">
            <div>
              <span class="font-semibold flex">Email</span>
              <div class="flex text-blue-400 items-center">
                <el-icon class="mr-3 font-semibold">
                  <Message />
                </el-icon>
                <span>gundamakp01@gmail.com</span>
              </div>
            </div>
            <div>
              <span class="font-semibold flex">Business Name</span>
              <div class="flex text-blue-400 items-center">
                <el-icon class="mr-3 font-semibold">
                  <Message />
                </el-icon>
                <span>1111111111111111</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 border-b-2 border-neutral-200">
        <span class="text-lg font-semibold">Time Zone</span>
      </div>
      <div class="p-5 mt-3">
        <div>
          <div class="flex gap-7">
            <div class="font-semibold w-1/5 text-right mb-5 text-sm">Your Business Timezone</div>
            <div class="w-1/2 text-sm">Solomon Islands Time</div>
          </div>
          <div class="flex gap-7">
            <div class="font-semibold w-1/5 text-right mb-3 text-sm">Your Timezone</div>
            <div class="w-1/2 text-sm">Solomon Islands Time</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'
import AvatarComponent from '../components/Profile/Avatar.vue'
import { ref } from 'vue'
</script>

<style scoped>
.main {
  padding: 25px 40px;
}

.dash-border {
  border-bottom: 1px dashed #ccc;
}
</style>
