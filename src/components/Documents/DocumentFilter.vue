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
          <el-checkbox-group class="flex flex-col p-3" v-model="status">
            <el-checkbox v-for="(item, index) in types" :key="index" :label="index">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <FilterCard
      v-for="(checkedType, index) in status"
      :key="index"
      :label="types[checkedType]"
      @remove="remove(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FilterCard from '@/components/Documents/FilterCard.vue'
const status = defineModel('status')
const emit = defineEmits(['remove-filter-status'])

const types = ['Completed', 'Draft', 'Expired', 'In-Progress', 'Need Reviews', 'Sent', 'Expired']

const remove = (index: Number) => {
  emit('remove-filter-status', index)
}
</script>

<style scoped></style>
