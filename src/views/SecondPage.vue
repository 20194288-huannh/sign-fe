<template>
  <StepCard
    title="Prepare Document - pdf-sample"
    sub-title="Where can the recipients be added to sign the document?"
  >
    <template #header-icon>
      <el-icon color="#00b3b3" size="30" class="mr-5">
        <component is="Message" />
      </el-icon>
    </template>
    <template #main>
      <PrepareDocument />
    </template>
  </StepCard>
</template>

<script lang="ts" setup>
import PrepareDocument from '@/components/MainStep/PrepareDocument/index.vue'
import StepCard from '@/components/StepCard.vue'
</script>

<style></style>
