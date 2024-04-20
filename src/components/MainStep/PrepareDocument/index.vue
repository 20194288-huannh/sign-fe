<template>
  <div class="relative">
    <div class="flex items-center bg-[#f4f4f4] h-[55px]">
      <div class="h-[55px] min-w-28 mt-4 ml-2 flex">
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
      </div>
    </div>
    <div id="pageContainer">
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

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const props = defineProps(['pdf'])

onMounted(() => {
  getPdf()
})

const { arrSignSecondStepValue } = useSendSignStore()
const dragger = ref(false)
const value = ref('2021-10-29')
const signatureValue = ref()

watch(
  () => signatureValue.value,
  () => {
    const _arrType = [...arrType.value]
    const findArrTypeSignature = _arrType.find((e) => e.type === 'signature')
    ;(findArrTypeSignature['text'] =
      arrSignSecondStepValue.main.find((e) => e.id === signatureValue.value)?.name ?? 'signature'),
      (arrType.value = _arrType)
  }
)

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

const dragStop = (type: string, index: number, idx: number) => {
  const _arrResize = [...arrType.value]

  _arrResize[index].arrSize[idx] = {
    ..._arrResize[index].arrSize[idx],
    width: checkStyleOfDragResize(type)
  }
  arrType.value = _arrResize
  dragger.value = false
}

const resize = (
  newRect: { width: number; height: number; top: number; left: number },
  idx: number,
  item: string,
  idx1: number
) => {
  dragger.value = true

  const _arrResize = [...arrType.value]

  _arrResize[idx].arrSize[idx1] = {
    width: newRect.width,
    height: newRect.height,
    top: newRect.top,
    left: newRect.left
  }
  arrType.value = _arrResize

  if (
    (newRect.top !== 0 || newRect.left !== 0) &&
    !arrType.value[idx].arrSize.find((e) => e.top == 0 && e.left == 0)
  ) {
    arrType.value[idx].arrSize.push({
      width: 100,
      height: 40,
      top: 0,
      left: 0
    })
  }
  console.log(arrType.value)
}

const getPdf = async () => {
  let container = document.getElementById('pageContainer')
  let pdfViewer = new PDFViewer({
    container: container
  })
  pdfViewer.setDocument(props.pdf)
}
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

.custom-select > .el-select__wrapper {
  height: 40px;
}
</style>
