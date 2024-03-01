<template>
  <StepCard title="Prepare Document - pdf-sample" :sub-title="item.subTitle">
    <template #header-icon>
      <el-icon color="#00b3b3" size="30" class="mr-5">
        <component :is="item.iconComponent" />
      </el-icon>
    </template>
    <template #main>
      <component :is="item.mainComponent" />
    </template>
  </StepCard>
</template>

<script lang="ts" setup></script>

<style></style>
