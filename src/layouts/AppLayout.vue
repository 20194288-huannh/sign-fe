<script setup lang="ts">
import AppLayoutDefault from './AppLayoutDefault.vue'
import GuestLayout from './GuestLayout.vue'
import { markRaw, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const route = useRoute()
const router = useRouter()
const layout = ref()

router.beforeEach(async (to, from) => {
  const layoutString = to.meta.layout
  if (layoutString === 'GuestLayout') {
    layout.value = GuestLayout
  } else {
    layout.value = AppLayoutDefault
  }
})
</script>

<template>
  <component :is="layout"> <router-view /> </component>
</template>
