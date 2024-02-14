<template>
    <DocumentFilter />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div
        class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
      >
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase header bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 font-semibold">Name</th>
            <th scope="col" class="px-6 py-3 font-semibold">Request By</th>
            <th scope="col" class="px-6 py-3 font-semibold">Request On</th>
            <th scope="col" class="px-6 py-3 font-semibold">Status</th>
            <th scope="col" class="px-6 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-s border-e border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <td class="px-6">
              <div
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white text-sm font-semibold"
              >
                <div class="text-sm font-semibold">LỊCH TRỰC NHẬT KIAI.xlsx - February_2024 (1)</div>
              </div>
            </td>
  
            <td class="px-6">
              <div
                scope="row"
                class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src="@/assets/img/profilebg128x128px.png"
                  alt="Jese image"
                />
                <div class="ps-3 text-sm font-semibold">Bonnie Green</div>
              </div>
            </td>
            <td class="px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                Online
              </div>
            </td>
            <td class="px-6">
              <el-button type="primary" plain>
                <el-icon size="16" class="pt-1"><MoreFilled /></el-icon>
              </el-button>
              <el-button type="primary" plain>
                <el-icon size="16"><Download /></el-icon>
              </el-button>
            </td>
          </tr>
          <tr
            class="bg-white border-s border-e border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <td class="px-6">
              <div
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white text-sm font-semibold"
              >
                <div class="text-sm font-semibold">LỊCH TRỰC NHẬT KIAI.xlsx - February_2024 (1)</div>
              </div>
            </td>
  
            <td class="px-6">
              <div
                scope="row"
                class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  src="@/assets/img/profilebg128x128px.png"
                  alt="Jese image"
                />
                <div class="ps-3 text-sm font-semibold">Bonnie Green</div>
              </div>
            </td>
            <td class="px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                Offline
              </div>
            </td>
            <td class="px-6">
              <el-button type="primary" plain>
                <el-icon size="16" class="pt-1"><MoreFilled /></el-icon>
              </el-button>
              <el-button type="primary" plain>
                <el-icon size="16"><Download /></el-icon>
              </el-button>
            </td>
          </tr>
          <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-4 p-4">
                      <div class="flex items-center">
                          <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                      </div>
                  </td>
                  <td class="px-6 py-4">
                      <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white text-sm font-semibold">
                      <div class="text-sm font-semibold">LỊCH TRỰC NHẬT KIAI.xlsx - February_2024 (1)</div> 
                  </th>
                  </td>
                  <td class="px-6 py-4">
                      <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img class="w-10 h-10 rounded-full" src="@/assets/img/profilebg128x128px.png" alt="Jese image">
                      <div class="ps-3 text-sm font-semibold">Bonnie Green</div>
                  </th>
                  </td>
                  <td class="px-6 py-4">
                      <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                      </div>
                  </td>
                  <td class="px-6 py-4">
                      <el-button type="primary" plain>
                          <el-icon size="16" class="pt-1"><MoreFilled /></el-icon>
                      </el-button>
                      <el-button type="primary" plain>
                          <el-icon size="16"><Download /></el-icon>
                      </el-button>
                  </td>
              </tr> -->
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import DocumentFilter from '@/components/Documents/DocumentFilter.vue'
  </script>
  
  <style scoped>
  .header{
    background-color: #f1f1f1;
    padding: 7px 10px;
    border-bottom: 2px solid #dee2e6;
    border-top: 2px solid #dee2e6;
  }</style>
  