<template>
    <div class="main">
        <div class="flex border-b-2 pb-3">
            <span class="text-lg font-semibold">My Signature</span>
        </div>
        <el-card class="box-card mt-3 pl-5 pr-5">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Draw" name="draw">
                    <Draw />
                </el-tab-pane>
                <el-tab-pane label="Type" name="type">Type</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import Draw from '@/components/MySignature/Draw.vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('draw')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
  
<style scoped>
.main {
    padding: 25px 40px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
  