<template>
  <div class="flex justify-between border p-4 rounded" v-if="document">
    <div class="flex">
      <div class="border p-3 w-[155px]">
        <img src="@/assets/img/profilebg128x128px.png" />
        <div class="pt-1 flex justify-center truncate">{{ document.file.name }} ...</div>
      </div>
      <div class="flex flex-col justify-between p-5">
        <p>
          <span class="text-[#6c757d] font-semibold mr-2">Name: </span>
          <span>{{ document.file.name }}</span>
        </p>
        <p>
          <span class="text-[#6c757d] font-semibold mr-2">Requested by: </span
          >{{ document.user.name }}
        </p>
        <p>
          <span class="text-[#6c757d] font-semibold mr-2">Requested On: </span
          >{{ document.requested_on }}
        </p>
        <p><span class="text-[#6c757d] font-semibold mr-2">Expiry Date: </span>05/22/2024</p>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div>
        <div
          class="w-[75px] h-[75px] rounded-full flex items-center justify-center"
          :style="`background-color: ${items[document.status].bgColor};`"
        >
          <component
            :is="items[document.status].component"
            class="text-[#FFF] font-semibold"
            width="45px"
            height="45px"
          />
        </div>
        <span class="text-sm pt-1">{{ items[document.status].title }}</span>
      </div>
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
import type { Document, DocumentInfo } from '@/types/document.interface.ts'

const document = defineModel<Document>('document', { required: true })

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
