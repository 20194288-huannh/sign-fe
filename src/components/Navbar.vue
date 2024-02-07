<template>
  <Disclosure as="nav" class="background">
    <div
      :class="`mx-auto text-white py-5 hover:bg-sky-500 ${path.includes(route.path) ? 'active' : ''}`"
      v-for="route in routes"
      :key="route.path"
    >
      <router-link :to="route.path">
        <component :is="route.icon" class="h-8 w-8 m-auto" />
      </router-link>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue'
import { routes } from '@/router/routes.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const path = computed(() => route.path)
</script>

<style scoped>
.background {
  background: linear-gradient(to bottom, #00b3b3 0, #1370f8 100%);
}
.active {
  background: rgba(0, 0, 0, 0.1);
}
</style>
