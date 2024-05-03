<template>
  <a
    href="#"
    class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex h-100 flex-start pr-3"
  >
    <div
      style="background-color: rgb(144, 79, 171)"
      class="doc-items pl-4 pr-4 pt-3 pb-3 text-white rounded-s-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#000"
        width="35"
        height="35"
      >
        <path
          d="M16.7,20.6a.7.7,0,0,1-.8.8H3.4a.7.7,0,0,1-.8-.8V3.4a.7.7,0,0,1,.8-.8h7.8V5.7a2.4,2.4,0,0,0,2.4,2.4l1.5-1.6H13.6a.8.8,0,0,1-.8-.8v-2l2.6,2.6.7-.7.4-.4L13.2,1.9A2.8,2.8,0,0,0,11,1H3.4A2.4,2.4,0,0,0,1,3.4V20.6A2.4,2.4,0,0,0,3.4,23H15.9a2.4,2.4,0,0,0,2.4-2.4V14.7l-1.6,1.6Z"
          transform="translate(-1 -1)"
          fill="#fff"
        ></path>
        <path
          d="M22.2,5.1A2.3,2.3,0,0,0,19,4.8l-.2.3L17.2,6.7l-6.7,6.6a6.1,6.1,0,0,0-.7,1l-2,4H4.9a.8.8,0,0,0-.8.8.9.9,0,0,0,.8.8H8.1a.5.5,0,0,0,.5-.3h.1l4.4-2.1.9-.7.4-.4h0l6.2-6.3,1.6-1.5A2.5,2.5,0,0,0,23,6.8,2.5,2.5,0,0,0,22.2,5.1ZM12.5,15.9l-.2.2-2.2,1.1L11.2,15l.3-.5.5.5.7.8Zm1.4-1.3-.7-.6-.6-.6,5.1-5.1L19,9.5Zm7.2-7.2-1,1.1L18.8,7.2l1.1-1a.6.6,0,0,1,.6-.3l.6.3a.9.9,0,0,1,.3.6.9.9,0,0,1-.3.7Z"
          transform="translate(-1 -1)"
          fill="currentcolor"
        ></path>
      </svg>
    </div>
    <div class="flex flex-col m-auto ml-3">
      <span class="docs-count">0</span>
      <span class="docs-title">Need Reviews</span>
    </div>
  </a>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.docs-count {
  font-weight: bold;
  font-size: 18px;
}
.docs-title {
  color: #9e9e9e;
  font-weight: bold;
  font-size: 13px;
}
</style>
