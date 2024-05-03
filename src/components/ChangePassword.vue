<template>
  <div class="main">
    <div class="flex border-b-2 pb-3">
      <el-icon class="mr-3" size="25" color="#00B3B3"><Lock /></el-icon>
      <span class="text-lg font-semibold">Change Password</span>
    </div>
    <el-card class="box-card">
      <div class="col-span-full pl-5 pr-5 max-w-5xl">
        <div class="mt-2 flex items-center gap-x-3">
          <label
            for="current-password"
            class="basis-1/4 text-sm font-semibold leading-6 text-gray-900"
            >Current Password</label
          >
          <el-input
            id="current-password"
            v-model="password"
            class="basis-3/4"
            type="password"
            placeholder="Current Password"
            show-password
          />
        </div>
      </div>
      <div class="col-span-full pl-5 pr-5 max-w-5xl">
        <div class="mt-2 flex items-center gap-x-3">
          <label for="new-password" class="basis-1/4 text-sm font-semibold leading-6 text-gray-900"
            >New Password</label
          >
          <el-input
            id="new-password"
            v-model="newPassword"
            class="basis-3/4"
            type="password"
            placeholder="New Password"
            show-password
          />
        </div>
      </div>
      <div class="col-span-full pl-5 pr-5 max-w-5xl">
        <div class="mt-2 flex items-center gap-x-3">
          <label
            for="confirm-new-password"
            class="basis-1/4 text-sm font-semibold leading-6 text-gray-900"
            >Confirm New Password</label
          >
          <el-input
            id="confirm-new-password"
            v-model="confirmPassword"
            class="basis-3/4"
            type="password"
            placeholder="Confirm New Password"
            show-password
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main {
  padding: 25px 40px;
}
</style>
