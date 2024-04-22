<template>
  <div class="relative">
    <div class="flex items-center bg-[#f4f4f4] h-[55px]">
      <!-- <div class="h-[55px] min-w-28 mt-4 ml-2 flex">
        <el-select class="custom-select" v-model="signatureValue" clearable>
          <el-option
            v-for="item in arrSignSecondStepValue.main"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </div>
      <div
        class="relative h-[55px] min-w-28 mt-4 ml-2"
        v-for="(it, index) in arrType"
        :key="it.type"
      >
        <DropDragSign
          v-for="(item, idx) in it.arrSize"
          :key="item.id"
          :width="item.width"
          :height="item.height"
          :top="item.top"
          :left="item.left"
          @resize="(newRect) => resize(newRect, index, it.type, idx)"
          :text="it.text"
          @drag-stop="dragStop(it.type, index, idx)"
        >
          <el-date-picker
            v-model="value"
            format="YYYY-MM-DD"
            v-if="it.type === 'date' && (item.top !== 0 || item.left !== 0)"
          />
          <p v-if="it.type === 'signature' && (item.top !== 0 || item.left !== 0)">
            {{
              arrSignSecondStepValue.main.find((e) => e.id === signatureValue)?.name ?? 'signature'
            }}
          </p>
          <el-checkbox
            v-if="it.type === 'checkbox' && (item.top !== 0 || item.left !== 0)"
            class="w-10"
          />
          <el-radio v-if="it.type === 'radio' && (item.top !== 0 || item.left !== 0)" />
        </DropDragSign>
      </div> -->
      <div v-for="(item, index) in components" :key="index" @dragstart="handleDrag($event, item)" @drop="onDrop($event, item)" draggable="true"
        class="components-item">
        <el-icon :size="20">
          <component :is="item.icon" />
        </el-icon>
        {{ item.name }}
      </div>
    </div>
    <ToolBar />
    <div id="pageContainer" class="relative">
      <DropDragSign v-for="(item, idx) in signatures" :key="item.id" :width="item.width" :height="item.height"
        :top="item.top" :left="item.left" @resize="(newRect) => resize(newRect, item.type, idx)" :text="item.text"
        @drag-stop="dragStop(item.type, idx)">
        <el-date-picker v-model="value" format="YYYY-MM-DD"
          v-if="item.type === 'date'" />
        <p v-if="item.type === 'signature' && (item.top !== 0 || item.left !== 0)">
          {{
            arrSignSecondStepValue.main.find((e) => e.id === signatureValue)?.name ?? 'signature'
          }}
        </p>
        <el-checkbox v-if="item.type === 'checkbox' && (item.top !== 0 || item.left !== 0)" class="w-10" />
        <el-radio v-if="item.type === 'radio' && (item.top !== 0 || item.left !== 0)" />
      </DropDragSign>
      <div id="viewer" class="pdfViewer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pdfjsLib from 'pdfjs-dist/build/pdf'
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import { onMounted, ref, watch } from 'vue'
import DropDragSign from '@/components/DropDragSign.vue'
import { useSendSignStore } from '@/stores/send-sign'
import Logo from '@/assets/img/signature.png';
import ToolBar from '@/components/MainStep/PrepareDocument/ToolBar.vue'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const props = defineProps(['pdf'])

const { arrSignSecondStepValue } = useSendSignStore()
const dragger = ref(false)
const value = ref('2021-10-29')
const signatureValue = ref()
const signatures = defineModel('signatures')
const components = [
  {
    type: 'name',
    value: '',
    name: 'Name',
    width: 150,
    height: 30,
    icon: 'User',
  },
  {
    type: 'text',
    value: 'Text',
    inputType: 'input',
    name: 'Text',
    width: 150,
    height: 30,
    icon: 'Document',
  },
  {
    type: 'signature',
    name: 'Signature',
    url: Logo,
    width: 150,
    height: 30,
    icon: 'EditPen',
  },
  {
    type: 'checkbox',
    inputType: 'checkbox',
    name: 'Checkbox',
    label: '',
    width: 30,
    height: 30,
    icon: 'CircleCheckFilled',
  },
  {
    type: 'radio',
    inputType: 'radio',
    name: 'Radio',
    label: '',
    width: 30,
    height: 30,
    icon: 'More',
  },
  {
    type: 'date',
    inputType: 'date',
    name: 'Date',
    // value: formatDate(new Date()),
    width: 120,
    height: 30,
    icon: 'Calendar',
  },
]

watch(
  () => signatureValue.value,
  () => {
    const _arrType = [...arrType.value]
    const findArrTypeSignature = _arrType.find((e) => e.type === 'signature')
      ; (findArrTypeSignature['text'] =
        arrSignSecondStepValue.main.find((e) => e.id === signatureValue.value)?.name ?? 'signature'),
        (arrType.value = _arrType)
  }
)

const formatDate = (d = new Date()) => {
  const yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // Months start at 0!
  let dd = d.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = yyyy + '-' + mm + '-' + dd;

  return formattedToday;
}

const arrType = ref<any>([
  {
    type: 'signature',
    text: 'signature',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  },
  {
    type: 'radio',
    text: 'radio',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  },
  {
    type: 'date',
    text: 'date',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  },
  {
    type: 'checkbox',
    text: 'checkbox',
    arrSize: [
      {
        width: 100,
        height: 40,
        top: 0,
        left: 0
      }
    ]
  }
])

const checkStyleOfDragResize = (type: string) => {
  switch (type) {
    case 'date':
    case 'input':
      return 200
    case 'checkbox':
    case 'radio':
      return 50
    default:
      return 100
  }
}

const dragStop = (type: string, idx: number) => {
  // let signature = {
  //   type: arrType.value[idx].type
  // }
  // const _arrResize = [...arrType.value]

  // _arrResize[index].arrSize[idx] = {
  //   ..._arrResize[index].arrSize[idx],
  //   width: checkStyleOfDragResize(type)
  // }
  // arrType.value = _arrResize
  console.log(idx)
  dragger.value = false
}

const handleDrag = (e: any, item: any) => {
  let signature = {
    type: item.type,
    width: checkStyleOfDragResize(item.type),
    height: 40,
    top: e.clientY,
    left: e.clientX
  }
  signatures.value.push(signature)
  console.log(signatures.value)
}

const onDrop = (e: any, item: any) => {
  let signature = {
    type: item.type,
    width: checkStyleOfDragResize(item.type),
    height: 40,
    top: e.clientY,
    left: e.clientX
  }
  signatures.value.push(signature)
  console.log(signatures.value)
}

const resize = (
  newRect: { width: number; height: number; top: number; left: number },
  item: string,
  idx: number
) => {
  dragger.value = true

  // const _arrResize = [...arrType.value]
  signatures.value[idx] = {
    ...signatures.value[idx],
    ...newRect
  }
  console.log(signatures)

  // _arrResize[idx].arrSize[idx1] = {
  //   width: newRect.width,
  //   height: newRect.height,
  //   top: newRect.top,
  //   left: newRect.left
  // }
  // arrType.value = _arrResize

  // if (
  //   (newRect.top !== 0 || newRect.left !== 0) &&
  //   !arrType.value[idx].arrSize.find((e) => e.top == 0 && e.left == 0)
  // ) {
  //   arrType.value[idx].arrSize.push({
  //     width: 100,
  //     height: 40,
  //     top: 0,
  //     left: 0
  //   })
  // }
}

const getPdf = async () => {
  let container = document.getElementById('pageContainer')
  let pdfViewer = new PDFViewer({
    container: container
  })
  pdfViewer.setDocument(props.pdf)
}

onMounted(() => {
  getPdf()
})
</script>

<style>
#pageContainer {
  margin: auto;
  height: 700px;
  overflow: scroll;
}

.border {
  border: 1px solid red;
}

#viewer {
  display: flex;
  flex-direction: column;
  background-color: #eff1f3;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

div.page {
  display: inline-block;
}

.content-container {
  height: 40px !important;
}

.custom-select>.el-select__wrapper {
  height: 40px;
}

.vs-components {
  border-right: 1px solid #ececec;
  position: relative;
  overflow-y: scroll;
  overflow-x: scroll;
  padding: 0 10px;
  display: flex;
  background: #f8f8f8;
}

.vs-components::-webkit-scrollbar {
  display: none;
}

.vs-components .components-icon {
  text-align: center;
  width: 25px;
  height: 25px;
  margin-bottom: 6px;
  font-size: 30px;
}


.components-item {
  height: 65px;
  width: 50%;
  float: left;
  display: flex;
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: center;
  cursor: move;
  flex-direction: column;
  font-weight: 300;
}

.components-item:nth-child(2n + 1) {
  border-right: 1px solid #ececec;
}

.components-item:hover {
  background: #f5f5f5;
}
</style>
