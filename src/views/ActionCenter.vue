<script setup lang="ts">
import { NotificationService } from '@/services'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { ENotificationType } from '@/types/notification'

const notifications = ref()

const items = ref<Array<any>>([
  { bgColor: 'rgb(50, 195, 135)', title: 'Completed', count: 0 },
  { bgColor: 'rgb(160, 160, 160)', title: 'Draft', count: 0 },
  { bgColor: 'rgb(183, 75, 50)', title: 'Expired', count: 0 },
  { bgColor: 'rgb(255, 205, 0)', title: 'In-progress', count: 0 },
  { bgColor: 'rgb(144, 79, 171)', title: 'Needs-Review', count: 0 },
  { bgColor: 'rgb(15, 169, 219)', title: 'Sent', count: 0 }
])

const getAllNotification = async () => {
  const response = await NotificationService.getAll()
  notifications.value = response.data.data
}

const remove = async (id: number) => {
  try {
    await NotificationService.delete(id)
    ElNotification({
      type: ENotificationType.SUCCESS,
      title: 'Success',
      message: 'Remove notification successfully'
    })
    return
  } catch (e) {
    console.log(e)
  }
  getAllNotification()
}

getAllNotification()
</script>

<template>
  <div class="main">
    <div class="flex border-b-2 pb-3">
      <span class="text-sm font-semibold">Action Center</span>
    </div>
    <div class="w-full mt-4">
      <div class="action-main">
        <div class="">
          <div class="feed">
            <ul class="list-group list-group-flush mt-2 mb-2">
              <li
                class="list-group-item border-0 p-0 cardbox mt-1 mb-1 lg:block hidden"
                v-for="notification in notifications"
              >
                <div
                  class="flex justify-between items-top border-l-400 border-l-8 rounded"
                  :style="`border-color: ${items[notification.status].bgColor};`"
                >
                  <div class="flex justify-between p-3 w-80">
                    <div class="mr-2 flex flex-col justify-center">
                      <div class="userletter-32 float-left text-white bg-blue-500">H</div>
                    </div>
                    <div class="w-100 flex flex-col justify-center">
                      <div class="font-semibold text-truncate" title="Huan">
                        {{ notification.receiver.name }}
                      </div>
                      <div class="text-[#6c757d] text-xs float-left">
                        {{ notification.created_at }}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center p-3 pl-5 pr-5 w-full">
                    <div class="text-[#6c757d] text-xs mb-0">
                      <p class="text-[#6c757d] text-xs mb-0">{{ notification.content }}</p>
                      <div>
                        <router-link
                          class="font-semibold text-sm text-[#0e72ce]"
                          :to="`/documents/${notification.document.id}`"
                          :title="notification.document.file.name"
                        >
                          {{ notification.document.file.name }}</router-link
                        >
                      </div>
                    </div>
                    <div class="actionbtns flex">
                      <div class="w-110 text-right flex">
                        <a title="view" class="action-button text-[#00b3b3]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mt-1 h-6 w-6"
                          >
                            <path
                              d="M16.7 20.6a.7.7 0 0 1-.8.8H3.4a.7.7 0 0 1-.8-.8V3.4a.7.7 0 0 1 .8-.8h7.8V5.7a2.4 2.4 0 0 0 2.4 2.4l1.5-1.6H13.6a.8.8 0 0 1-.8-.8v-2l2.6 2.6.7-.7.4-.4L13.2 1.9A2.8 2.8 0 0 0 11 1H3.4A2.4 2.4 0 0 0 1 3.4V20.6A2.4 2.4 0 0 0 3.4 23H15.9a2.4 2.4 0 0 0 2.4-2.4V14.7l-1.6 1.6ZM12.5 15.9l-.2.2-2.2 1.1L11.2 15l.3-.5.5.5.7.8Zm1.4-1.3-.7-.6-.6-.6 5.1-5.1L19 9.5Zm7.2-7.2-1 1.1L18.8 7.2l1.1-1a.6.6 0 0 1 .6-.3l.6.3a.9.9 0 0 1 .3.6.9.9 0 0 1-.3.7Z"
                            />
                          </svg>
                        </a>
                        <a
                          title="Close"
                          class="action-button text-[#dc3545]"
                          @click="remove(notification.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mt-1 h-6 w-6"
                            style="height: 24px"
                          >
                            <path d="M18.2 4 20 5.8 5.8 20 4 18.2Z" />
                            <path d="M20 18.2 18.2 20 4 5.8 5.8 4Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.main {
  padding: 25px 40px;
}

.action-main {
  max-height: calc(100vh - 107px);
  overflow-y: auto;
  overflow-x: hidden;
}

.list-group {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
}

.cardbox,
.listbox {
  box-shadow: 0 0 13px 0 rgba(82, 63, 105, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.02) !important;
  border-radius: 10px !important;
  background-color: #fff;
}

.typeindicate {
  position: absolute;
  height: 100%;
  width: 4px;
  border-radius: 50px 0 0 50px;
}

.form-group.quesno .quesdiv,
.userletter-32 {
  text-align: center;
  font-weight: 700;
  font-size: 12px;
}

.userletter-32 {
  border: 1px solid #ccc;
  border-radius: 50%;
  height: 32px;
  padding-top: 5px;
  float: left;
  line-height: 18px;
  min-height: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  width: 32px;
  min-width: 32px;
  cursor: pointer;
}

.action-button {
  width: 28px;
  height: 28px;
  padding: 3px;
  line-height: 23px;
  border: none !important;
  background: 0 0;
}
</style>
