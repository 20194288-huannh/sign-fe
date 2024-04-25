<template>
  <div class="relative">
    <div class="flex items-center bg-[#f4f4f4] h-[55px]">
      <div
        v-for="(item, index) in components"
        :key="index"
        @dragstart="handleDrag($event, item)"
        @drop="onDrop($event, item)"
        draggable="true"
        class="components-item"
      >
        <el-icon :size="20">
          <component :is="item.icon" />
        </el-icon>
        {{ item.name }}
      </div>
    </div>
    <ToolBar
      v-model:totalPage="totalPage"
      v-model:pageNum="pageNum"
      v-model:signModal="signModal"
      @on-next-page="onNextPage"
      @on-prev-page="onPrevPage"
      @scale-up="scaleUp"
      @scale-down="scaleDown"
    />
    <div id="pageContainer" class="bg-[#3D424E33] relative">
      <div class="pdfContent">
        <DropDragSign
          v-for="(item, idx) in signatures"
          :key="item.id"
          :width="item.position.width"
          :height="item.position.height"
          :top="item.position.top"
          :left="item.position.left"
          @resize="(newRect) => resize(newRect, idx)"
          @drag="(newRect) => resize(newRect, idx)"
          :text="item.text"
          @drag-stop="dragStop(idx)"
        >
          <el-date-picker
            v-model="value"
            format="YYYY-MM-DD"
            v-if="item.type === SIGNATURE_TYPE.DATE"
          />
          <p
            v-if="
              item.type === SIGNATURE_TYPE.SIGNATURE &&
              (item.position.top !== 0 || item.position.left !== 0)
            "
          >
            {{
              arrSignSecondStepValue.main.find((e) => e.id === signatureValue)?.name ??
              SIGNATURE_TYPE.SIGNATURE
            }}
          </p>
          <el-checkbox
            v-if="
              item.type === SIGNATURE_TYPE.CHECKBOX &&
              (item.position.top !== 0 || item.position.left !== 0)
            "
            class="w-10"
          />
          <el-radio
            v-if="
              item.type === SIGNATURE_TYPE.RADIO &&
              (item.position.top !== 0 || item.position.left !== 0)
            "
          />
          <img :src="item.data.path" v-if="item.type === SIGNATURE_TYPE.IMAGE" />
        </DropDragSign>
        <canvas id="the-canvas" ref="canvas" class=""></canvas>
      </div>
    </div>
    <el-dialog v-model="signModal" title="Add Signature" width="800">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Draw" name="draw">
          <Draw @save="save" />
        </el-tab-pane>
        <el-tab-pane label="Type" name="type">Type</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/web/pdf_viewer.css'
import { onMounted, ref, watch } from 'vue'
import DropDragSign from '@/components/DropDragSign.vue'
import { useSendSignStore } from '@/stores/send-sign'
import Logo from '@/assets/img/signature.png'
import ToolBar from '@/components/MainStep/PrepareDocument/ToolBar.vue'
import Draw from '@/components/MySignature/Draw.vue'
import { SignatureService } from '@/services'
import type { Signature } from '@/types/send-sign'
import { SIGNATURE_TYPE } from '@/types/send-sign'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js'

const props = defineProps(['pdf'])

const { arrSignSecondStepValue } = useSendSignStore()
const dragger = ref(false)
const value = ref('2021-10-29')
const signatureValue = ref()
const signatures = defineModel('signatures', { required: true })
const canvasPdf = defineModel('canvas', { required: true })
const pdfContent = ref()
const totalPage = ref<Number>()
const scale = ref<Number>(1.5)
const signModal = ref<Boolean>(false)
const components = [
  {
    type: 'name',
    value: '',
    name: 'Name',
    width: 150,
    height: 30,
    icon: 'User'
  },
  {
    type: 'text',
    value: 'Text',
    inputType: 'input',
    name: 'Text',
    width: 150,
    height: 30,
    icon: 'Document'
  },
  {
    type: 'signature',
    name: 'Signature',
    url: Logo,
    width: 150,
    height: 30,
    icon: 'EditPen'
  },
  {
    type: 'checkbox',
    inputType: 'checkbox',
    name: 'Checkbox',
    label: '',
    width: 30,
    height: 30,
    icon: 'CircleCheckFilled'
  },
  {
    type: 'radio',
    inputType: 'radio',
    name: 'Radio',
    label: '',
    width: 30,
    height: 30,
    icon: 'More'
  },
  {
    type: 'date',
    inputType: 'date',
    name: 'Date',
    // value: formatDate(new Date()),
    width: 120,
    height: 30,
    icon: 'Calendar'
  }
]

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
        height: 100,
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
        height: 100,
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
        height: 100,
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
        height: 100,
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

const pageNum = ref(1)
const pageRendering = ref(false)
const pageNumPending = ref()
const canvas = ref<any>()
const pdfDoc = ref<any>()
const activeName = ref<String>('draw')

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
const renderPage = (num: number) => {
  pageRendering.value = true
  let ctx = canvas.value.getContext('2d')
  // Using promise to fetch the page
  pdfDoc.value.getPage(num).then(function (page: any) {
    var viewport = page.getViewport(scale.value)
    canvas.value.height = viewport.height
    canvas.value.width = viewport.width
    canvasPdf.value.width = viewport.width
    canvasPdf.value.height = viewport.height

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    var renderTask = page.render(renderContext)

    renderTask.promise.then(function () {
      pageRendering.value = false
      if (pageNumPending.value) {
        // New page rendering is pending
        renderPage(pageNumPending.value)
        pageNumPending.value = null
      }
    })
  })

  // Update page counters
  // document.getElementById('page_num').textContent = num
}

const scaleUp = () => {
  scale.value = Number(scale.value) + 0.1
  renderPage(pageNum.value)
}

const scaleDown = () => {
  scale.value = Number(scale.value) - 0.1
  renderPage(pageNum.value)
}

const save = async (signaturePad: any) => {
  const { isEmpty, data } = signaturePad.saveSignature()
  if (!isEmpty) {
    var form = new FormData()
    form.append('signature', dataURLtoFile(data, 'signature.png'))
    const response = await SignatureService.create(form)
    const drawSign = response.data.data
    let signature = {
      type: SIGNATURE_TYPE.IMAGE,
      scale: Number(scale.value),
      page: pageNum.value,
      position: {
        width: 100,
        height: 60,
        top: 0,
        left: 0
      },
      data: {
        id: drawSign.file.id,
        path: drawSign.file.path,
        name: drawSign.file.name
      }
    }
    signModal.value = false
    signatures.value.push(signature as never)
  }
}

const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(','),
    mime = (arr[0].match(/:(.*?);/) as never)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num: number) {
  if (pageRendering) {
    pageNumPending.value = num
  } else {
    renderPage(num)
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum.value <= 1) {
    return
  }
  pageNum.value--
  renderPage(pageNum.value)
}

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum.value >= pdfDoc.value.numPages) {
    return
  }
  pageNum.value++
  renderPage(pageNum.value)
}

/**
 * Asynchronously downloads PDF.
 */

const dragStop = (idx: number) => {
  dragger.value = false
  console.log('drag stop')
  console.log(signatures.value)
}

const handleDrag = (e: any, item: any) => {
  console.log('drag')
  console.log(signatures.value)
}

const onDrop = (e: any, item: any) => {
  console.log('on drop')
  console.log(signatures.value)
}

const resize = (
  newRect: { width: number; height: number; top: number; left: number },
  idx: number
) => {
  dragger.value = true
  signatures.value[idx].position = {
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
  // pdfjsLib.getDocument(`http://localhost:8868/api/files/2`).promise.then(function (pdfDoc_: any) {
  if (props.pdf) {
    pdfDoc.value = props.pdf
    totalPage.value = pdfDoc.value.numPages

    // Initial/first page rendering
    renderPage(pageNum.value)
  }
}

onMounted(() => {
  getPdf()
})

watch(
  () => props.pdf,
  () => {
    getPdf()
  }
)
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
.pdfContent {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
