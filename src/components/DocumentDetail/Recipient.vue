<template>
  <div>
    <div class="font-semibold">Recipient Status</div>
    <div
      class="flex justify-between border p-4 rounded mt-5"
      v-for="recipient in recipients"
      v-if="recipients"
    >
      <div class="flex justify-center">
        <img src="@/assets/img/profilebg128x128px.png" height="25px" width="25px" />
        <div class="ml-4">
          <div>{{ recipient.name }}</div>
          <div>{{ recipient.email }}</div>
        </div>
      </div>
      <el-steps style="max-width: 600px; min-width: 300px" :active="recipient.status" align-center>
        <el-step title="Sent" />
        <el-step title="Viewed" />
        <el-step title="Completed" />
      </el-steps>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Completed from '../Icon/Completed.vue'
import Draft from '../Icon/Draft.vue'
import Expired from '../Icon/Expired.vue'
import InProgress from '../Icon/InProgress.vue'
import NeedsReview from '../Icon/NeedsReview.vue'
import Sent from '../Icon/Sent.vue'
import type { Receiver } from '@/types/send-sign'

const recipients = defineModel<Receiver[]>('recipients')
const items = ref<Array<any>>([
  { component: Completed, bgColor: 'rgb(50, 195, 135)', title: 'Completed', count: 0 },
  { component: Draft, bgColor: 'rgb(160, 160, 160)', title: 'Draft', count: 0 },
  { component: Expired, bgColor: 'rgb(183, 75, 50)', title: 'Expired', count: 0 },
  { component: InProgress, bgColor: 'rgb(255, 205, 0)', title: 'In-progress', count: 0 },
  { component: NeedsReview, bgColor: 'rgb(144, 79, 171)', title: 'Needs-Review', count: 0 },
  { component: Sent, bgColor: 'rgb(15, 169, 219)', title: 'Sent', count: 0 }
])
</script>

<style scoped></style>
