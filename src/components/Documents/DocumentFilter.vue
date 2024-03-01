<template>
  <div class="bg-gray-100 w-100 flex p-3">
    <el-dropdown>
      <el-button type="success">
        <el-icon size="18">
          <Filter />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-checkbox-group class="flex flex-col p-3" v-model="checkedTypes">
            <el-checkbox v-for="item in types" :key="item" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <FilterCard
      v-for="(checkedType, index) in checkedTypes"
      :key="index"
      :label="checkedType"
      @remove="remove(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FilterCard from '@/components/Documents/FilterCard.vue'

const checkedTypes = ref(['Need Reviews', 'Draft'])
const types = ['Need Reviews', 'Draft', 'In-Progress', 'Completed', 'Sent', 'Expired']

const remove = (key: string) => {
  checkedTypes.value.splice(+key, 1)
}
</script>

<style scoped></style>
