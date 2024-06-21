<script setup lang="ts">
import DocumentItem from '@/components/Dashboard/DocumentItem.vue'
import { Completed, Draft, Expired, InProgress, NeedsReview, Sent } from '@/components/Icon'
import PieChart from './PieChart.vue'
import AuditTrailItem from './AuditTrailItem.vue'
import { ref, computed } from 'vue'
import { DocumentService, ActionService } from '@/services'
import { ppid } from 'process'

const items = ref<Array<any>>([
  { component: Completed, bgColor: 'rgb(50, 195, 135)', title: 'Completed', count: 0 },
  { component: Draft, bgColor: 'rgb(160, 160, 160)', title: 'Draft', count: 0 },
  { component: Expired, bgColor: 'rgb(183, 75, 50)', title: 'Expired', count: 0 },
  { component: InProgress, bgColor: 'rgb(255, 205, 0)', title: 'In-progress', count: 0 },
  { component: NeedsReview, bgColor: 'rgb(144, 79, 171)', title: 'Needs-Review', count: 0 },
  { component: Sent, bgColor: 'rgb(15, 169, 219)', title: 'Sent', count: 0 }
])

const actions = ref<Array<any>>([])

const fetchStatistics = async () => {
  const response = await DocumentService.getStatistics()
  const statistics = response.data.data
  statistics.forEach(function (statistic) {
    let currentStatus = items.value.find(function (item, index) {
      return index == statistic.status
    })
    currentStatus.count = statistic.count
  })
}

const fetchActions = async () => {
  const response = await ActionService.get()
  actions.value = response.data.data
}

const series = computed(() => {
  return items.value.map(function (item) {
    return item.count
  })
})

fetchStatistics()
fetchActions()
</script>

<template>
  <div class="flex w-100 gap-8">
    <DocumentItem
      v-for="item in items"
      class="w-1/6"
      :title="item.title"
      :bgColor="item.bgColor"
      v-model:count="item.count"
    >
      <component :is="item.component" />
    </DocumentItem>
  </div>
  <div class="flex w-100 gap-10 mt-8">
    <el-card class="content">
      <h3 class="title p-5">Audit Trail</h3>
      <el-scrollbar height="60vh">
        <AuditTrailItem class="scrollbar-demo-item" v-for="action in actions" :action="action" />
      </el-scrollbar>
    </el-card>
    <el-card class="content">
      <h3 class="title p-5 border-y-2">Performance</h3>
      <PieChart :series="series" />
    </el-card>
  </div>
</template>

<style scoped lang="css">
:deep(.el-card__body) {
  padding: 0 !important;
}
:deep(.el-card.content) {
  width: 50%;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
</style>
