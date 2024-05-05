<template>
  <Disclosure as="nav" class="background">
    <div :class="`mx-auto text-white py-5 hover:bg-sky-500 ${path.includes(route.path) ? 'active' : ''}`"
      v-for="route in routes" :key="route.path">
      <router-link :to="route.path">
        <component :is="route.icon" class="h-7 w-7 m-auto" />
      </router-link>
    </div>
    <div :class="`mx-auto text-white py-5 hover:bg-sky-500 ${path.includes('/my-signature') ? 'active' : ''}`">
      <router-link to="/my-signature">
        <Signature/>
      </router-link>
    </div>
    <div :class="`mx-auto text-white py-5 hover:bg-sky-500 ${path.includes('/dashboard') ? 'active' : ''}`">
      <router-link to="/dashboard" class="flex items-center justify-center">
        <Statistic class="text-white" />
      </router-link>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue'
import { routes } from '@/router/routes.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Statistic, Signature } from '@/components/Icon'

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
