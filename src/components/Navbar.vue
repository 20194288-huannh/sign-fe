<template>
  <Disclosure as="nav" class="bg-gradient-to-t from-sky-700 via-purple-500 to-blue-300">
    <el-icon class="!text-white !w-12 !h-12 mt-5"><CirclePlusFilled class="!h-12 !w-12" /></el-icon>
    <div class="mx-auto text-white py-5 hover:bg-sky-500" v-for="route in routes" :key="route.path">
      <router-link :to="route.path">
        <component :is="route.icon" class="h-8 w-8 m-auto" />
      </router-link>
    </div>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { routes } from '@/router/routes.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
]
</script>
