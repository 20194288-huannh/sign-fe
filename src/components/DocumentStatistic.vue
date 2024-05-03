<script setup lang="ts">
import DocumentIcon from '@/components/DocumentIcon.vue'
</script>

<template>
  <div class="flex w-100">
    <DocumentIcon v-for="i in 6" class="w-1/6" />
  </div>
  <div class="flex w-100 gap-10 mt-5">
    <el-card class="content overflow-y-scroll h-48">
      <h3 class="title p-5">Audit Trail</h3>
      <div class="flex gap-5 items-start border-y-2 p-3">
        <img
          alt=""
          placement="right"
          width="27"
          height="27"
          class="img"
          style="cursor: pointer"
          src="https://d13d1qr27dbvhu.cloudfront.net/app/v1.1/war/app/images/profilebg128x128px.png"
        />
        <div>
          <div>Vinh Hoang uploaded the document</div>
          <div>Apr 29, 2024 10:57:27 AM</div>
        </div>
      </div>
      <div class="flex gap-5 items-start border-y-2 p-3">
        <img
          alt=""
          placement="right"
          width="27"
          height="27"
          class="img"
          style="cursor: pointer"
          src="https://d13d1qr27dbvhu.cloudfront.net/app/v1.1/war/app/images/profilebg128x128px.png"
        />
        <div>
          <div>Vinh Hoang uploaded the document</div>
          <div>Apr 29, 2024 10:57:27 AM</div>
        </div>
      </div>
    </el-card>
    <el-card class="content">
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
    </el-card>
  </div>
</template>

<style scoped lang="css">
.docs-count {
  font-weight: bold;
  font-size: 18px;
}
.docs-title {
  color: #9e9e9e;
  font-weight: bold;
  font-size: 13px;
}
:deep(.el-card__body) {
  padding: 0 !important;
}
:deep(.el-card.content) {
  width: 50%;
}
.title {
  font-weight: bold;
}
.img {
  height: 27px;
  width: 27px;
  border-radius: 10px;
}
</style>
