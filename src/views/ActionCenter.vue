<script setup lang="ts">
import SignUp from '../components/SignUp.vue'
</script>

<template>
  <div class="main">
    <div class="flex border-b-2 pb-3">
      <span class="text-lg font-semibold">Action Center</span>
    </div>
    <div class="flex justify-center w-full mt-4">
      <div class="w-100 action-main">
        <div class="flex">
          <div class="feed w-100">
            <ul class="list-group list-group-flush mt-2 mb-2">
              <li class="list-group-item border-0 p-0 cardbox mt-1 mb-1 lg:block hidden">
                <div class="typeindicate bg-yellow-400"></div>
                <div class="flex justify-between items-top">
                  <div class="flex justify-between p-3 w-64">
                    <div class="mr-2">
                      <div class="userletter-32 float-left text-white bg-blue-500"> H </div>
                    </div>
                    <div class="w-100">
                      <div class="font-weight-bold text-truncate" title="Huan">Huan</div>
                      <div class="text-muted text-xs float-left">Feb 07, 2024 07:36:06 PM</div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center p-3 pl-5 pr-5 w-full">
                    <div class="text-muted text-xs mb-0">
                      <p class="text-muted text-xs mb-0"> Viewed a document </p>
                      <div>
                        <a href="javascript:void(0)" class="font-weight-bold text-lg"
                          title="LỊCH TRỰC NHẬT KIAI.xlsx - February_2024 (1)"> LỊCH TRỰC NHẬT KIAI.xlsx - February_2024
                          (1)</a>
                      </div>
                    </div>
                    <div class="actionbtns flex">
                      <div class="w-110 text-right">
                        <a href="javascript:void(0)" title="Close" class="btn btn-outline-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 h-6 w-6">
                            <path d="M18.2 4 20 5.8 5.8 20 4 18.2Z" />
                            <path d="M20 18.2 18.2 20 4 5.8 5.8 4Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item border-0 p-0 cardbox mt-1 mb-1 lg:block hidden">
                <div class="typeindicate bg-purple-600"></div>
                <div class="flex justify-between items-top">
                  <div class="flex justify-between p-3 w-64">
                    <div class="mr-2">
                      <div class="userletter-32 float-left text-white bg-cyan-400"> HN </div>
                    </div>
                    <div class="w-100">
                      <div class="font-weight-bold text-truncate" title="Huấn Nguyễn Hữu">Huấn Nguyễn Hữu</div>
                      <div class="text-muted text-xs float-left">Feb 06, 2024 09:25:47 PM</div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center p-3 pl-5 pr-5 w-full">
                    <div class="text-muted text-xs mb-0">
                      <p class="text-muted text-xs mb-0"> Need your signature </p>
                      <div>
                        <a href="javascript:void(0)" class="font-weight-bold text-lg"
                          title="LỊCH TRỰC NHẬT KIAI.xlsx - February_2024 (1)"> LỊCH TRỰC NHẬT KIAI.xlsx - February_2024
                          (1)</a>
                      </div>
                    </div>
                    <div class="actionbtns flex">
                      <div class="w-110 text-right">
                        <a href="javascript:void(0)" title="view" class="btn btn-outline-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 h-6 w-6">
                            <path
                              d="M16.7 20.6a.7.7 0 0 1-.8.8H3.4a.7.7 0 0 1-.8-.8V3.4a.7.7 0 0 1 .8-.8h7.8V5.7a2.4 2.4 0 0 0 2.4 2.4l1.5-1.6H13.6a.8.8 0 0 1-.8-.8v-2l2.6 2.6.7-.7.4-.4L13.2 1.9A2.8 2.8 0 0 0 11 1H3.4A2.4 2.4 0 0 0 1 3.4V20.6A2.4 2.4 0 0 0 3.4 23H15.9a2.4 2.4 0 0 0 2.4-2.4V14.7l-1.6 1.6ZM12.5 15.9l-.2.2-2.2 1.1L11.2 15l.3-.5.5.5.7.8Zm1.4-1.3-.7-.6-.6-.6 5.1-5.1L19 9.5Zm7.2-7.2-1 1.1L18.8 7.2l1.1-1a.6.6 0 0 1 .6-.3l.6.3a.9.9 0 0 1 .3.6.9.9 0 0 1-.3.7Z" />
                          </svg>
                        </a>
                        <a href="javascript:void(0)" title="Close" class="btn btn-outline-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 h-6 w-6">
                            <path d="M18.2 4 20 5.8 5.8 20 4 18.2Z" />
                            <path d="M20 18.2 18.2 20 4 5.8 5.8 4Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <!-- more list items -->
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<style lang="css">
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
.cardbox, .listbox {
    box-shadow: 0 0 13px 0 rgba(82,63,105,.05);
    border: 1px solid rgba(0, 0, 0, .02) !important;
    border-radius: 10px !important;
    background-color: #fff;
}
.typeindicate {
    position: absolute;
    height: 100%;
    width: 4px;
    border-radius: 50px 0 0 50px;
}
.form-group.quesno .quesdiv, .userletter-32 {
    text-align: center;
    font-weight: 700;
    font-size: 12px;
}
</style>