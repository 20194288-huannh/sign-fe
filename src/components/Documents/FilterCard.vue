<template>
    <div class="bg-white flex items-center rounded-sm ml-2"> 
        <div class="border-r-2 border-neutral-200 pl-2 pr-2">{{ label }}</div>
        <el-button link class="pl-2 pr-2" @click="$emit('remove', key)">
            <el-icon><Close /></el-icon>
    </el-button>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps(['label', 'key'])
</script>

<style scoped>

</style>