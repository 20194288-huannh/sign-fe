<template>
  <DocumentFilter v-model:status="status" @remove-filter-status="removeFilterStatus" />
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text" v-model="filter" id="table-search-users"
          class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search" />
      </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase header bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 font-semibold">Name</th>
          <th scope="col" class="px-6 py-3 font-semibold">Status</th>
          <th scope="col" class="px-6 py-3 font-semibold">Request By</th>
          <th scope="col" class="px-6 py-3 font-semibold">Request On</th>
          <th scope="col" class="px-6 py-3 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents"
          class="bg-white border-s border-e border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="px-6">
            <div scope="row"
              class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white text-sm font-semibold">
              <div class="text-sm font-semibold">{{ document.file?.name }}</div>
            </div>
          </td>
          <td class="px-6">
            <div class="flex items-center">
              <div :class="`h-2.5 w-2.5 rounded-full me-2 ${mappingStatus[document.status]}`"></div>
              {{ capitalizeFirstLetter(mappingStatus[document.status]) }}
            </div>
          </td>

          <td class="px-6">
            <div scope="row"
              class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <img class="w-10 h-10 rounded-full" src="@/assets/img/profilebg128x128px.png" alt="Jese image" />
              <div class="ps-3 text-sm font-semibold">{{ document.user.name }}</div>
            </div>
          </td>
          <td class="px-6">
            <div scope="row"
              class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="ps-3 text-sm">{{ document.requested_on }}</div>
            </div>
          </td>
          <td class="px-6">
            <el-button type="primary" plain>
              <el-icon size="16" class="pt-1">
                <MoreFilled />
              </el-icon>
            </el-button>
            <el-button type="primary" plain @click="downloadFile(document.file)">
              <el-icon size="16">
                <Download />
              </el-icon>
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination class="m-3" v-model:current-page="currentPage" :page-size="pagination?.per_page" :pager-count="pagination?.last_page"
      layout="prev, pager, next" :total="pagination?.total" />
  </div>
</template>

<script setup lang="ts">
import DocumentFilter from '@/components/Documents/DocumentFilter.vue'
import { DocumentService, FileService } from '@/services'
import type { Document, Pagination } from '@/types/document.interface'
import { ref, onMounted, watch } from 'vue'
import { Status } from '@/types/document.interface'
import type { FileInfo } from '@/types/document.interface'

const documents = ref<Document[]>([])
const status = ref<Array<Number>>([0, 1, 2, 3, 4, 5])
const filter = ref<string>('')
const currentPage = ref<number>(1)
const mappingStatus: { [key: number]: string } = {
  0: 'completed',
  1: 'draft',
  2: 'expired',
  3: 'in-progress',
  4: 'needs-review',
  5: 'sent'
}
const loading = ref<boolean>(false)
const pagination = ref<Pagination>()

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const removeFilterStatus = (key: number) => {
  status.value.splice(key, 1)
  fetchDocuments()
}

const fetchDocuments = async () => {
  if (loading.value) return
  loading.value = true
  try {
    if (status.value.length) {
    const response = await DocumentService.getByUserId({
      page: currentPage.value, status: status.value.toString(), filter: filter.value
    })
    if (response.data.data) {
      documents.value = response.data.data.documents
    } else {
      documents.value = []
    }
    pagination.value = response.data.data.pagination
  } else {
    documents.value = []
  }
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const downloadFile = async (file: FileInfo) => {
  const response = await FileService.download(file.id)

  const blob = new Blob([response.data], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = file.name
  link.click()
  URL.revokeObjectURL(link.href)
}

onMounted(() => {
  fetchDocuments()
})

watch(
  () => [status.value, filter.value, currentPage.value],
  () => {
    fetchDocuments()
  }
)
</script>

<style scoped>
.header {
  background-color: #f1f1f1;
  padding: 7px 10px;
  border-bottom: 2px solid #dee2e6;
  border-top: 2px solid #dee2e6;
}

.draft {
  background-color: #a0a0a0;
}

.in-progress {
  background-color: #ffcd00;
}

.expired {
  background-color: #b74b32;
}

.completed {
  background-color: #32c387;
}

.sent {
  background-color: #0fa9db;
}

.void {
  background-color: #ea603b;
}

.needs-review {
  background-color: #904fab;
}
</style>
