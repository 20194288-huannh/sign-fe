<template>
  <div class="flex gap-5 items-start border-y-2 pr-6 pl-6 pt-4 pb-4">
    <img
      alt=""
      placement="right"
      width="27"
      height="27"
      class="img"
      style="cursor: pointer"
      src="https://d13d1qr27dbvhu.cloudfront.net/app/v1.1/war/app/images/profilebg128x128px.png"
    />
    <div class="ml-2">
      <div class="content">
        <span class="user">{{ props.action.name }}</span>
        <span class="action"> uploaded the document</span>
      </div>
      <div class="timestamp">{{ props.action.created_at }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['action'])
</script>

<style lang="css" scoped>
.content {
  font-size: 18px;
}
.img {
  height: 27px;
  width: 27px;
  border-radius: 10px;
}
.timestamp {
  color: #9e9e9e;
  font-size: 14px;
}
.action {
  color: #6c757d;
}
.user {
  font-weight: bold;
  color: #247ede;
}
</style>
